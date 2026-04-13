const nodemailer = require('nodemailer');
const config = require('../config/config');
const dns = require('dns');

// Force IPv4 resolution first to prevent ENETUNREACH errors on Render/IPv6 networks
dns.setDefaultResultOrder('ipv4first');

// ─── Brevo HTTP API sender (works on Render — uses HTTPS, not SMTP) ───
async function sendViaBrevo(to, subject, text, html) {
    console.log(`[Brevo API] Sending email to: ${to}, subject: "${subject}"`);

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'api-key': config.BREVO_API_KEY,
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            sender: { name: 'Shree Krishna Enterprises', email: config.BREVO_SENDER || config.GOOGLE_USER },
            to: [{ email: to }],
            subject,
            htmlContent: html || `<p>${text}</p>`,
            textContent: text,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Brevo API error (${response.status}): ${errorBody}`);
    }

    const data = await response.json();
    console.log('Email sent via Brevo API. Message ID:', data.messageId);
    return data;
}

// ─── Gmail SMTP sender (works on localhost, blocked on Render free tier) ───
let gmailTransporter = null;

function getGmailTransporter() {
    if (gmailTransporter) return gmailTransporter;

    if (config.GOOGLE_APP_PASSWORD) {
        gmailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.GOOGLE_USER,
                pass: config.GOOGLE_APP_PASSWORD,
            },
        });
        console.log('Gmail SMTP configured with App Password');
    } else if (config.GOOGLE_REFRESH_TOKEN) {
        gmailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: config.GOOGLE_USER,
                clientId: config.GOOGLE_CLIENT_ID,
                clientSecret: config.GOOGLE_CLIENT_SECRET,
                refreshToken: config.GOOGLE_REFRESH_TOKEN,
            },
        });
        console.log('Gmail SMTP configured with OAuth2');
    }

    return gmailTransporter;
}

async function sendViaGmail(to, subject, text, html) {
    const transporter = getGmailTransporter();
    if (!transporter) throw new Error('Gmail SMTP is not configured');

    console.log(`[Gmail SMTP] Sending email to: ${to}, subject: "${subject}"`);

    const info = await transporter.sendMail({
        from: `"Shree Krishna Enterprises" <${config.GOOGLE_USER}>`,
        to,
        subject,
        text,
        html,
    });

    console.log('Email sent via Gmail SMTP. Message ID:', info.messageId);
    return info;
}

// ─── Main sendEmail: picks the right strategy ───
// Priority: Brevo API (works everywhere) → Gmail SMTP (localhost only)
const sendEmail = async (to, subject, text, html) => {
    // 1. Try Brevo HTTP API first (works on Render since it uses HTTPS, not SMTP port)
    if (config.BREVO_API_KEY) {
        try {
            return await sendViaBrevo(to, subject, text, html);
        } catch (err) {
            console.error('Brevo API failed:', err.message);
            console.log('   → Falling back to Gmail SMTP...');
        }
    }

    // 2. Fallback to Gmail SMTP (works on localhost, may be blocked on Render)
    try {
        return await sendViaGmail(to, subject, text, html);
    } catch (err) {
        console.error('Gmail SMTP also failed:', err.message);
        throw new Error('All email delivery methods failed. Please check your configuration.');
    }
};

module.exports = { sendEmail };