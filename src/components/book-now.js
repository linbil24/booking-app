import React, { useState } from 'react';
import './css/book-now.css';

const BookNow = ({ onBack }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        course: 'tdc',
        branch: 'Main Branch',
        date: '',
        address: '',
        name: '',
        phone: '',
        email: ''
    });

    const handleCourseSelect = (course) => {
        setFormData({ ...formData, course });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(4); // Success step
    };

    return (
        <div className="book-now-container">
            <div className="book-now-card">
                {/* Information Sidebar */}
                <div className="book-sidebar">
                    <div className="sidebar-content">
                        <h2>Reserve Your Slot</h2>
                        <p>Take the first step towards becoming a safe and confident driver with Master School.</p>

                        <div className="step-indicator">
                            <div className={`step ${step >= 1 ? 'active' : ''}`}>
                                <div className="step-num">1</div>
                                <span className="step-label">Choose Course</span>
                            </div>
                            <div className={`step ${step >= 2 ? 'active' : ''}`}>
                                <div className="step-num">2</div>
                                <span className="step-label">Branch & Date</span>
                            </div>
                            <div className={`step ${step >= 3 ? 'active' : ''}`}>
                                <div className="step-num">3</div>
                                <span className="step-label">Contact Details</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="book-form-section">
                    <div className="form-header">
                        <h3>{step === 4 ? 'Status' : 'Registration'}</h3>
                        {step < 4 && (
                            <button className="back-to-login" onClick={onBack}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                Back to Login
                            </button>
                        )}
                    </div>

                    {step === 1 && (
                        <div className="booking-form">
                            <div className="input-section">
                                <label>Select Course Type</label>
                                <div className="course-grid">
                                    <div
                                        className={`course-option ${formData.course === 'tdc' ? 'selected' : ''}`}
                                        onClick={() => handleCourseSelect('tdc')}
                                    >
                                        <h4>TDC</h4>
                                        <p>Theoretical Driving Course (15 Hours)</p>
                                    </div>
                                    <div
                                        className={`course-option ${formData.course === 'pdc' ? 'selected' : ''}`}
                                        onClick={() => handleCourseSelect('pdc')}
                                    >
                                        <h4>PDC</h4>
                                        <p>Practical Driving Course (Manual/Auto)</p>
                                    </div>
                                </div>
                            </div>
                            <div className="form-footer">
                                <button className="next-btn" onClick={nextStep}>Continue to Schedule</button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="booking-form">
                            <div className="input-section">
                                <label>Preferred Branch</label>
                                <select
                                    className="book-input book-select"
                                    name="branch"
                                    value={formData.branch}
                                    onChange={handleInputChange}
                                >
                                    <option value="main">Main Branch (Quezon City)</option>
                                    <option value="v-luna">V. Luna Branch</option>
                                    <option value="marikina">Marikina Branch</option>
                                    <option value="fairview">Fairview Branch</option>
                                    <option value="antipolo">Antipolo Branch</option>
                                    <option value="malamig">Pasig Branch</option>
                                    <option value="bacoor">Meycauayan Branch</option>
                                    <option value="malabon">Malabon Branch</option>
                                    <option value="binan">Binan, Laguna Branch</option>
                                    <option value="laspinas"> Las Piñas Branch</option>
                                    <option value="bacoor">Bacoor Branch</option>
                                    <option value="san-mateo">San Mateo</option>
                                </select>
                            </div>
                            <div className="input-section">
                                <label>Select Start Date</label>
                                <input
                                    type="date"
                                    className="book-input"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="input-section">
                                <label>Location Address</label>
                                <input
                                    type="text"
                                    className="book-input"
                                    placeholder="e.g. Unit 123, Street Name, Brgy, City"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-footer">
                                <button className="prev-btn" onClick={prevStep}>Back</button>
                                <button className="next-btn" onClick={nextStep}>Continue to Info</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <form className="booking-form" onSubmit={handleSubmit}>
                            <div className="input-section">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="book-input"
                                    placeholder="e.g. Juan Dela Cruz"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                                <div className="input-section" style={{ flex: 1 }}>
                                    <label>Mobile Number</label>
                                    <input
                                        type="tel"
                                        className="book-input"
                                        placeholder="09XX XXX XXXX"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="input-section">
                                <label>Email Address (Optional)</label>
                                <input
                                    type="email"
                                    className="book-input"
                                    placeholder="juan@example.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-footer">
                                <button type="button" className="prev-btn" onClick={prevStep}>Back</button>
                                <button type="submit" className="next-btn">Confirm Booking</button>
                            </div>
                        </form>
                    )}

                    {step === 4 && (
                        <div className="success-view">
                            <div className="success-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
                            </div>
                            <h3>Booking Requested!</h3>
                            <p>Thank you for choosing Master School. Our branch coordinator will contact you shortly to confirm your schedule and payment details.</p>
                            <button className="done-btn" onClick={onBack}>Return to Home</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookNow;
