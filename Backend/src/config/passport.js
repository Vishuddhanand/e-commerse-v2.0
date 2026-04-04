const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
                googleId: profile.id
            });
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