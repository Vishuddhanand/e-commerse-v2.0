import React from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.css'; // Reusing some login styles or adding new ones
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, loading, handleLogout } = useAuth();
    const navigate = useNavigate()

    if (loading) {
        return <div className="profile-container" style={{textAlign: 'center', padding: '50px'}}>Loading profile...</div>;
    }

    if (!user) {
        navigate("/");
    }

    return (
        <div className="login-page"> {/* Reusing page wrapper for background */}
            <div className="login-container" style={{ maxWidth: '600px' }}>
                <div className="login-header">
                    <div className="brand-name">Shree Krishna Enterprises</div>
                    <h1>User Profile</h1>
                    <p>Manage your account information</p>
                </div>

                <div className="profile-content" style={{ marginTop: '20px' }}>
                    <div className="profile-info-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#666' }}>Username</label>
                        <div style={{ fontSize: '1.2rem', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                            {user.username}
                        </div>
                    </div>

                    <div className="profile-info-group" style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', color: '#666' }}>Email</label>
                        <div style={{ fontSize: '1.2rem', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                            {user.email}
                        </div>
                    </div>

                    {user.role && (
                        <div className="profile-info-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontWeight: 'bold', display: 'block', color: '#666' }}>Role</label>
                            <div style={{ fontSize: '1.2rem', padding: '10px', background: '#f9f9f9', borderRadius: '8px', textTransform: 'capitalize' }}>
                                {user.role}
                            </div>
                        </div>
                    )}

                    <div className="profile-actions" style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
                        <button 
                            className="login-btn" 
                            style={{ background: '#ff4444' }} 
                            onClick={handleLogout}
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
