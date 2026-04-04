const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
    const { username, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User with the same username or email already exists"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    }).select("+password")

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            email: user.email
        }
    })

}

async function googleCallbackController(req, res) {
    try {
        const user = req.user;

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true
        });

        // redirect to frontend
        res.redirect("http://127.0.0.1:3001");

    } catch (err) {
        res.status(500).json({
            message: "Google login failed",
            error: err.message
        });
    }
}

function logoutController(req, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
}

async function getMeController(req, res) {
  try {
    const userId = req.user.id; // from JWT middleware

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



module.exports = {
    registerController,
    loginController,
    googleCallbackController,
    logoutController,
    getMeController
}