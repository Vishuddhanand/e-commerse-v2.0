const userModel = require("../models/user.model");
const sessionModel = require("../models/session.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const otpModel = require("../models/otp.model");
const { sendEmail } = require("../services/email.service");
const config = require("../config/config");
const { generateOtp, getOtpHtml } = require("../utils/otp.utils");

async function registerController(req, res) {
    try {
        const { username, email, password, adminKey } = req.body;

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            if (existingUser.verified) {
                return res.status(400).json({
                    message: "User with the same username or email already exists"
                })
            } else {
                // If the user exists but is NOT verified (ghost account from failed OTP), delete them so they can restart registration.
                await userModel.findByIdAndDelete(existingUser._id);
                await otpModel.deleteMany({ email: existingUser.email });
            }
        }

        const hash = crypto.createHash("sha256").update(password).digest("hex");

        const isAdmin = adminKey && adminKey === config.ADMIN_SECRET_KEY;

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role: isAdmin ? "admin" : "user"
        })

        // Generate and save OTP
        const otp = generateOtp();
        const html = getOtpHtml(otp);
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

        await otpModel.create({
            email,
            user: user._id,
            otpHash
        })

        // Try to send the OTP email
        let emailSent = false;
        try {
            await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html);
            emailSent = true;
        } catch (emailErr) {
            console.error("Failed to send OTP email during registration:", emailErr.message);
            // Don't roll back the user — allow them to resend OTP
        }

        res.status(201).json({
            message: emailSent
                ? "Registration successful! Please check your email for the OTP."
                : "Registration successful! OTP email could not be sent. Please use 'Resend OTP' to try again.",
            emailSent,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                verified: user.verified
            }
        })
    } catch (err) {
        console.error("Registration error:", err.message);
        res.status(500).json({
            message: "Registration failed",
            error: err.message
        })
    }
}

async function loginController(req, res) {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        if (!user.verified) {
            return res.status(403).json({
                message: "Email not verified. Please verify your email first.",
                needsVerification: true,
                email: user.email
            })
        }

        const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
        const isPasswordValid = hashedPassword === user.password;

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

        const refreshToken = jwt.sign({
            id: user._id
        }, config.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        )

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

        const session = await sessionModel.create({
            user: user._id,
            refreshTokenHash,
            ip: req.ip,
            userAgent: req.headers[ "user-agent" ]
        })

        const accessToken = jwt.sign({
            id: user._id,
            sessionId: session._id,
            username: user.username,
            role: user.role
        }, config.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        )

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            accessToken,
        })
    } catch (err) {
        res.status(500).json({
            message: "Login failed",
            error: err.message
        })
    }
}

async function googleCallbackController(req, res) {
    try {
        const user = req.user;

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                role: user.role
            },
            config.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        res.redirect(`/auth/success?token=${token}`);

    } catch (err) {
        res.status(500).json({
            message: "Google login failed",
            error: err.message
        });
    }
}

function logoutController(req, res) {
    res.clearCookie("token");
    res.clearCookie("refreshToken"); // also clearing refreshToken
    res.json({ message: "Logged out successfully" });
}

async function getMeController(req, res) {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User fetched successfully",
            user
        });

    } catch (err) {
        res.status(500).json({
            message: "Server error",
            error: err.message
        });
    }
}

async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
        const otpRecord = await otpModel.findOne({ email, otpHash });

        if (!otpRecord) {
            return res.status(400).json({ message: "Invalid or expired OTP. Please request a new one." });
        }

        // Check if OTP has expired
        if (otpRecord.expiresAt && otpRecord.expiresAt < new Date()) {
            await otpModel.deleteMany({ email });
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        const user = await userModel.findById(otpRecord.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.verified = true;
        await user.save();

        await otpModel.deleteMany({ email }); // Clear the OTP records

        const token = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
        }, config.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token);

        res.status(200).json({
            message: "Email verified successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                verified: user.verified
            }
        });
    } catch (err) {
        res.status(500).json({
            message: "OTP Verification failed",
            error: err.message
        });
    }
}

async function resendOtpController(req, res) {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "No account found with this email. Please register first." });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Email is already verified. Please login." });
        }

        // Delete any existing OTPs for this email
        await otpModel.deleteMany({ email });

        // Generate new OTP
        const otp = generateOtp();
        const html = getOtpHtml(otp);
        const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

        await otpModel.create({
            email,
            user: user._id,
            otpHash
        });

        // Send the OTP email
        await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, html);

        res.status(200).json({
            message: "OTP has been resent to your email.",
            emailSent: true
        });
    } catch (err) {
        console.error("Resend OTP error:", err.message);
        res.status(500).json({
            message: "Failed to resend OTP. Please try again later.",
            error: err.message
        });
    }
}

module.exports = {
    registerController,
    loginController,
    googleCallbackController,
    logoutController,
    getMeController,
    verifyOtpController,
    resendOtpController
}