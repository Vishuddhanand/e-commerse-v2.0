import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import "../../../shared/style.css"
import { useAuth } from '../hooks/useAuth';

function Login() {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await handleLogin({ email, password })
            navigate("/")
        } catch (err) {
            // Error is already toasted in useAuth
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = "https://shree-krishna-enterprises-pune.onrender.com/api/auth/google";
    };

    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-header">
                    <h2 className="brand-name">Shree Krishna Enterprises</h2>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>

                </form>

                <div className="divider">
                    <span>or</span>
                </div>

                <button className="google-btn" onClick={handleGoogleLogin}>
                    Continue with Google
                </button>

                <p className="register-text">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;

