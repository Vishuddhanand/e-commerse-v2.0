const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const sessionModel = mongoose.model("sessions", sessionSchema);

module.exports = sessionModel;
