import React from 'react';

const Header = () => {
    return (
        <header className="top-bar">
            <div className="search-container">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search for careers, skills, or resources..." />
            </div>
            <div className="user-actions">
                <button className="notification-btn"><i className="fas fa-bell"></i><span className="notification-badge">3</span></button>
                <div className="user-profile">
                    <img src="/api/placeholder/40/40" alt="User Profile" className="profile-img" />
                    <span className="username">Alex Johnson</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        </header>
    );
};

export default Header;
