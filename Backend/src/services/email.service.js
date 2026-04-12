const nodemailer = require('nodemailer');
const config = require('../config/config');
const dns = require('dns');

// Force IPv4 resolution first to prevent ENETUNREACH errors on Render/IPv6 networks
dns.setDefaultResultOrder('ipv4first');

let transporter;

// Try OAuth2 first, fallback to App Password if GOOGLE_APP_PASSWORD is set
if (config.GOOGLE_APP_PASSWORD) {
    // Simpler, more reliable: Gmail App Password
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.GOOGLE_USER,
            pass: config.GOOGLE_APP_PASSWORD
        }
    });
    console.log('Email service configured with App Password');
} else {
    // OAuth2 method (can expire if Google Cloud project is in testing mode)
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: config.GOOGLE_USER,
            clientId: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            refreshToken: config.GOOGLE_REFRESH_TOKEN
        }
    });
    console.log('Email service configured with OAuth2');
}

// Verify the connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('Email server connection FAILED:', error.message);
        console.error('   → If using OAuth2, your refresh token may have expired.');
        console.error('   → Consider using a Gmail App Password instead (set GOOGLE_APP_PASSWORD in .env).');
    } else {
        console.log('Email server is ready to send messages');
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        console.log(`Attempting to send email to: ${to}, subject: "${subject}"`);
        const info = await transporter.sendMail({
            from: `"Shree Krishna Enterprises" <${config.GOOGLE_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log(' Email sent successfully. Message ID:', info.messageId);
        return info;
    } catch (error) {
        console.error(' Error sending email to', to, ':', error.message);
        if (error.message.includes('invalid_grant') || error.message.includes('Invalid credentials')) {
            console.error('   → OAuth2 refresh token has expired. Please generate a new one or use Gmail App Password.');
        }
        throw error; // Propagate so callers can handle email failures
    }
};

module.exports = { sendEmail };