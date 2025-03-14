import React from 'react';

const Dashboard = () => {
    return (
        <div className="app-container">
            <nav className="sidebar">
                <div className="logo-container">
                    <img src="/api/placeholder/80/80" alt="CareerAI Logo" className="logo" />
                    <h1>CareerAI</h1>
                </div>
                <ul className="nav-links">
                    <li className="active"><a href="#"><i className="fas fa-home"></i> Dashboard</a></li>
                    <li><a href="#"><i className="fas fa-compass"></i> Explore Careers</a></li>
                    <li><a href="#"><i className="fas fa-graduation-cap"></i> Learning Paths</a></li>
                    <li><a href="#"><i className="fas fa-chart-line"></i> Market Trends</a></li>
                    <li><a href="#"><i className="fas fa-calendar-alt"></i> Events</a></li>
                    <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
                </ul>
                <div className="upgrade-box">
                    <h3>Upgrade to Pro</h3>
                    <p>Get personalized career coaching and premium features</p>
                    <button className="upgrade-btn">Upgrade Now</button>
                </div>
            </nav>

            <main className="content">
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

                <div className="welcome-banner">
                    <div className="welcome-text">
                        <h2>Welcome back, Alex!</h2>
                        <p>Your career journey is on track. Here's what's new for you today.</p>
                    </div>
                    <div className="quick-actions">
                        <button id="consultation-btn" className="action-btn primary"><i className="fas fa-robot"></i> AI Consultation</button>
                        <button id="assessment-btn" className="action-btn"><i className="fas fa-tasks"></i> Skill Assessment</button>
                    </div>
                </div>

                {/* Additional sections can be added here */}
            </main>
        </div>
    );
};

export default Dashboard;
