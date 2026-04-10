import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [adminKey, setAdminKey] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await handleRegister({ username, email, password, adminKey })
      navigate("/")
    } catch (err) {
      // Error handled in useAuth
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-header">
          <div className="brand-name">Shree Krishna Enterprises</div>
          <h1>Create Account</h1>
          <p>Join us and start shopping</p>
        </div>

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

          <div className="form-group">
            <label>Admin Key (optional)</label>
            <input type="password" placeholder="Enter admin key if applicable" value={adminKey} onChange={(e) => setAdminKey(e.target.value)} />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

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
