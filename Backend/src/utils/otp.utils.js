function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpHtml(otp) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #4CAF50; padding: 20px; text-align: center;">
                <h2 style="color: white; margin: 0; font-size: 24px;">Shree Krishna Enterprises</h2>
            </div>
            <div style="padding: 30px; text-align: center;">
                <h3 style="color: #333; margin-top: 0;">OTP Verification</h3>
                <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Use the following OTP to complete your registration process. This code is valid for 10 minutes.</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; display: inline-block; margin-bottom: 20px;">
                    <h1 style="color: #4CAF50; letter-spacing: 5px; margin: 0; font-size: 36px; font-weight: bold;">${otp}</h1>
                </div>
                <p style="color: #999; font-size: 14px; margin: 0;">If you didn't request this, you can safely ignore this email.</p>
            </div>
        </div>
    `;
}

module.exports = {
    generateOtp,
    getOtpHtml
};
