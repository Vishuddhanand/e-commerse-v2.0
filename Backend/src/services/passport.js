const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");
const config = require("../config/config");

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await userModel.findOne({
            email: profile.emails[0].value
        });

        if (!user) {
            user = await userModel.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
                verified: true
            });
        } else if (!user.verified) {
            // If they registered normally but never verified, Google login verifies them
            user.verified = true;
            await user.save();
        }

        return done(null, user);

    } catch (err) {
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user._id);  // store user id
});

passport.deserializeUser((id, done) => {
    done(null, { id }); // you can also fetch full user if needed
});

module.exports = passport;