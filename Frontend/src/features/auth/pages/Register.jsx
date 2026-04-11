import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { loading, handleRegister, handleVerifyOtp, handleResendOtp } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = await handleRegister({ username, email, password, adminKey })
      setIsOtpSent(true)
      startResendCooldown()
    } catch (err) {
      // Error handled in useAuth
    }
  }

  async function handleOtpSubmit(e) {
    e.preventDefault()
    try {
      await handleVerifyOtp({ email, otp })
      navigate("/")
    } catch (err) {
      // Error handled in useAuth
    }
  }

  async function handleResend() {
    try {
      await handleResendOtp({ email })
      startResendCooldown()
    } catch (err) {
      // Error handled in useAuth
    }
  }

  function startResendCooldown() {
    setResendCooldown(60)
    const interval = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-header">
          <div className="brand-name">Shree Krishna Enterprises</div>
          <h1>{isOtpSent ? "Verify Email" : "Create Account"}</h1>
          <p>{isOtpSent ? `We have sent an OTP to ${email}` : "Join us and start shopping"}</p>
        </div>

        {!isOtpSent ? (
          <form onSubmit={handleSubmit} className="register-form">

            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="register-form">
            <div className="form-group">
              <label>Enter OTP</label>
              <input 
                type="text" 
                placeholder="6-digit code" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                required 
                maxLength={6} 
                style={{ letterSpacing: '5px', textAlign: 'center', fontSize: '1.2rem', fontWeight: 'bold' }} 
              />
            </div>
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              className="resend-otp-btn"
              onClick={handleResend}
              disabled={loading || resendCooldown > 0}
            >
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </form>
        )}

        <div className="divider">
          <span>or</span>
        </div>

        <button className="google-btn" onClick={handleGoogleLogin}>
          Continue with Google
        </button>

        <div className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
