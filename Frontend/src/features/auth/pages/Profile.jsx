import React from 'react';
import { useAuth } from '../hooks/useAuth';
import '../styles/login.css';
import '../styles/profile.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Profile = () => {
    const { user, loading, handleLogout } = useAuth();
    const navigate = useNavigate()
    const { t } = useTranslation();

    if (loading) {
        return <div className="login-page"><div className="login-container profile-wrapper" style={{textAlign: 'center'}}>Loading...</div></div>;
    }

    if (!user) {
        navigate("/");
    }

    return (
        <div className="login-page">
            <div className="login-container profile-wrapper">
                <div className="login-header">
                    <div className="brand-name">{t('auth.brandName')}</div>
                    <h1>{t('auth.profileTitle')}</h1>
                    <p>{t('auth.profileSubtitle')}</p>
                </div>

                <div className="profile-content">
                    <div className="profile-avatar-container">
                        <div className="profile-avatar">
                            {user.picture ? (
                                <img src={user.picture} alt="Profile" referrerPolicy="no-referrer" />
                            ) : (
                                <span>{user.username ? user.username.charAt(0) : '?'}</span>
                            )}
                        </div>
                    </div>

                    <div className="profile-info-group">
                        <label>{t('auth.username')}</label>
                        <div className="profile-info-value">
                            {user.username}
                        </div>
                    </div>

                    <div className="profile-info-group">
                        <label>{t('auth.emailLabel')}</label>
                        <div className="profile-info-value">
                            {user.email}
                        </div>
                    </div>

                    <div className="profile-actions">
                        <button 
                            className="profile-logout-btn" 
                            onClick={handleLogout}
                        >
                            {t('auth.logoutBtn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
