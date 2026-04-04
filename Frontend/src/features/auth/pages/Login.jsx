import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import "../../../shared/style.css"

function Login() {
    return (
        <div className="login-page">
            <div className="login-container">

                <div className="login-header">
                    <h2 className="brand-name">Shree Krishna Enterprises</h2>
                    <h1>Welcome Back</h1>
                    <p>Sign in to your account</p>
                </div>

                <form className="login-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="you@email.com" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" />
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>

                </form>

                <div className="divider">
                    <span>or</span>
                </div>

                <button className="google-btn">
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
