import React from "react";
import { Link } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  return (
    <div className="register-page">
      <div className="register-container">

        <div className="register-header">
          <div className="brand-name">Shree Krishna Enterprises</div>
          <h1>Create Account</h1>
          <p>Join us and start shopping</p>
        </div>

        <form className="register-form">

          <div className="form-group">
            <label>Username</label>
            <input type="text" placeholder="Enter your username" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" />
          </div>

          <button className="register-btn">Create Account</button>
        </form>

        <div className="divider">
          <span>or</span>
        </div>

        <button className="google-btn">
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