const { Router } = require("express")
const authController = require("../controllers/auth.controller")
const validators = require("../validator/auth.validator")
const authRouter = Router();
const passport = require("../services/passport");
const authMiddleware = require("../middlewares/auth.middleware")

authRouter.post("/register", validators.registerValidator, authController.registerController)
authRouter.post("/login", validators.loginValidator, authController.loginController)
authRouter.get("/get-me", authMiddleware, authController.getMeController)


// Protected route
authRouter.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user
  });
});


// Google login
authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);

// Google callback
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login"
    }),
    authController.googleCallbackController
);

authRouter.post("/logout", authController.logoutController)

authRouter.post("/verify-otp", authController.verifyOtpController)

module.exports = authRouter;