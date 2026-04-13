require("dotenv").config();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not defined in environment variables");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET is not defined in environment variables");
}

// At least one email sending method must be configured
if (!process.env.BREVO_API_KEY && !process.env.GOOGLE_APP_PASSWORD && !process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error("At least one email method must be configured: BREVO_API_KEY, GOOGLE_APP_PASSWORD, or GOOGLE_REFRESH_TOKEN");
}

if (!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE_USER is not defined in environment variables");
}

if (!process.env.ADMIN_SECRET_KEY) {
    throw new Error("ADMIN_SECRET_KEY is not defined in environment variables");
}

const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
    GOOGLE_USER: process.env.GOOGLE_USER,
    ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY,
    BREVO_API_KEY: process.env.BREVO_API_KEY,
    BREVO_SENDER: process.env.BREVO_SENDER
}

module.exports = config;