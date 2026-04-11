const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model");
const config = require("../config/config");

passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    proxy: true
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
                picture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
                verified: true
            });
        } else {
            let needsSave = false;
            if (!user.verified) {
                user.verified = true;
                needsSave = true;
            }
            if (profile.photos && profile.photos.length > 0 && user.picture !== profile.photos[0].value) {
                user.picture = profile.photos[0].value;
                needsSave = true;
            }
            if (needsSave) {
                await user.save();
            }
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