const mongoose = require("mongoose")


const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, "Email is required" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "User is required" ]
    },
    otpHash: {
        type: String,
        required: [ true, "OTP hash is required" ]
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
        index: { expires: 0 } // TTL index: MongoDB auto-deletes when expiresAt is reached
    }
}, {
    timestamps: true
})

const otpModel = mongoose.model("otps", otpSchema)

module.exports = otpModel