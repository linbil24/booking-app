
import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt:', { email, password });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Left Side - Form */}
                <div className="login-form-section">
                    <div className="login-header">
                        <h1>WELCOME</h1>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email/Phone</label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Enter your email or phone"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </span>
                            </div>
                        </div>

                        <div className="form-actions">
                            <a href="#forgot" className="forgot-password">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-btn">LOGIN</button>

                        <div className="register-prompt">
                            Don't have an account? <a href="#enroll">Enroll Now</a>
                        </div>

                        <div className="divider">
                            <span>OR</span>
                        </div>

                        <button type="button" className="google-btn">
                            <span className="google-icon">G</span> Sign in with Google
                        </button>
                    </form>
                </div>

                {/* Right Side - Branding/Image */}
                <div className="login-brand-section">
                    <div className="brand-content">
                        <div className="brand-logo-placeholder">
                            <span>(M) MASTER</span>
                        </div>
                        <h2 className="brand-title">
                            <span className="brand-school">Master School</span>
                            <span className="brand-tagline">Drive with Confidence</span>
                        </h2>
                        <p>Join the best driving school and master the road today.</p>
                        <button className="book-now-btn">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
