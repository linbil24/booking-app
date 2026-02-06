import React, { useState } from 'react';
import logo from '../image/logo.jpg';
import './css/Login.css';

const Login = ({ onLogin, onRegister, onBook }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [showTerms, setShowTerms] = useState(false);
    const [agreed, setAgreed] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password.');
            return;
        }

        // Mock validation for demo
        console.log('Login attempt:', { email, password });

        // Simulating credential check
        if (email === 'admin@gmail.com' && password === '123') {
            if (onLogin) onLogin();
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {/* Left Side - Form */}
                <div className="login-form-section">
                    <div className="login-header">
                        <h1>WELCOME</h1>
                    </div>

                    {error && <div className="login-error-alert">{error}</div>}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="input-group">
                            <label htmlFor="email">Email / Username</label>
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
                                    {showPassword ? '👁' : '🔒'}
                                </span>
                            </div>
                        </div>

                        <div className="form-actions">
                            <a href="#forgot" className="forgot-password">Forgot Password?</a>
                        </div>

                        <div className="terms-checkbox-container">
                            <input
                                type="checkbox"
                                id="terms-checkbox"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                            />
                            <label htmlFor="terms-checkbox">
                                I agree to the <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>Terms & Conditions</button>
                            </label>
                        </div>

                        <button type="submit" className="login-btn" disabled={!agreed}>LOGIN</button>

                        <div className="register-prompt">
                            Don't have an account? <button type="button" className="enroll-link" onClick={onRegister}>Enroll Now</button>
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
                            <img src={logo} alt="Logo" className="brand-logo" />
                        </div>
                        <h2 className="brand-title">
                            <span className="brand-school">Master School</span>
                            <span className="brand-tagline">Drive with Confidence</span>
                        </h2>
                        <p>Join the best driving school and master the road today.</p>
                        <button className="book-now-btn" onClick={onBook}>Book Now</button>
                    </div>
                </div>
            </div>

            {/* Terms and Conditions Modal */}
            {showTerms && (
                <div className="modal-overlay">
                    <div className="modal-container terms-modal">
                        <div className="modal-header">
                            <h2>Terms and Conditions</h2>
                            <button className="close-modal" onClick={() => setShowTerms(false)}>&times;</button>
                        </div>
                        <div className="modal-body terms-content">
                            <p>These terms and conditions govern the enrollment and participation in the Driving courses offered by MASTER DRIVING SCHOOL. By enrolling in our driving school, you agree to the following terms:</p>

                            <h4>1. ELIGIBILITY</h4>
                            <ul>
                                <li>Student(s) must be at least 16 years of age with Parents consent when applying for TDC.</li>
                                <li>Student(s) must hold a valid Student Permit or valid Driver's license to enroll in any driving course.</li>
                            </ul>

                            <h4>2. ENROLLMENT AND PAYMENT</h4>
                            <ul>
                                <li>Enrollment is only confirmed upon receipt of a completed application form and payment of the course fee.</li>
                                <li>50% Down payment is acceptable.</li>
                                <li>Full payment must be made before the 2nd day of lesson.</li>
                                <li>Payments are <strong>NON-REFUNDABLE</strong> and <strong>NON-TRANSFERABLE</strong> unless stated otherwise in the cancellation and refund policy.</li>
                            </ul>

                            <h4>3. CANCELLATION AND REFUND POLICY</h4>
                            <ul>
                                <li>A full refund will be issued if the student cancels the enrollment within (5) five days before the course start date.</li>
                                <li>If a lesson is cancelled by the student, a (5) five days' notice is required to reschedule without incurring a fee.</li>
                                <li>Failure to give proper notice or missed lessons may result in late payment fee:
                                    <ul>
                                        <li>1st re-schedule: Php 1,000.00</li>
                                        <li>2nd re-schedule: Lesson Forfeiture</li>
                                    </ul>
                                </li>
                                <li>Refunds for courses cancelled by the driving school will be issued in full.</li>
                            </ul>

                            <h4>4. LESSON SCHEDULE</h4>
                            <ul>
                                <li>Lessons are scheduled according to the availability of both the instructor and the student.</li>
                                <li>Punctuality is required. Late arrival may lose the portion of the lesson missed.</li>
                            </ul>

                            <h4>5. STUDENT CONDUCT</h4>
                            <ul>
                                <li>Students must follow all instructions from the instructor and comply with all traffic laws.</li>
                                <li>Use of alcohol or illegal substances is strictly prohibited and results in termination without refund.</li>
                            </ul>

                            <h4>6. LIABILITY</h4>
                            <ul>
                                <li>The school is not liable for damage or loss unless caused by direct negligence.</li>
                                <li>Students are responsible for any fines or legal issues arising from their actions (PDC).</li>
                            </ul>

                            <h4>7. COMPLETION OF COURSE</h4>
                            <ul>
                                <li>Certificates depend on performance and test results.</li>
                                <li>The school does not guarantee a driver's license issuance.</li>
                            </ul>

                            <h4>8. PRIVACY POLICY</h4>
                            <p>The driving school respects your privacy and is committed to protecting your personal information. Personal details collected will be kept confidential and used only for course administration and legal purposes.</p>

                            <h4>9. AMENDMENTS</h4>
                            <p>The driving school reserves the right to amend these Terms and Conditions at any time. Any changes will be communicated via phone call or email.</p>
                        </div>
                        <div className="modal-footer">
                            <button className="confirm-btn" onClick={() => setShowTerms(false)}>I Understand</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
