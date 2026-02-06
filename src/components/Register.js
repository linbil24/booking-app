import React, { useState } from 'react';
import './css/Register.css';
import logo from '../image/logo.jpg';

const Register = ({ onBack, onRegister }) => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dob: '',
        age: '',
        gender: 'male',
        civilStatus: 'single',
        nationality: 'filipino',
        birthPlace: '',
        address: '',
        email: '',
        phone: '',
        contactNumber: '',
        zipCode: '',
        course: 'tdc',
        programType: 'face-to-face-tdc',
        branch: 'main',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Prevent negative numbers for age
        if (name === 'age' && value < 0) return;

        // Restriction for Phone Numbers: 11 digits only, numbers only
        if (name === 'phone' || name === 'contactNumber') {
            const numericValue = value.replace(/\D/g, ''); // Remove non-digits
            if (numericValue.length <= 11) {
                setFormData({ ...formData, [name]: numericValue });
                if (errors[name]) setErrors({ ...errors, [name]: '' });
            }
            return;
        }

        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateStep = (currentStep) => {
        let newErrors = {};

        if (currentStep === 1) {
            if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
            if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            if (!formData.dob) newErrors.dob = 'Birth date is required';
            if (!formData.age) newErrors.age = 'Age is required';
            else if (parseInt(formData.age) < 16) newErrors.age = 'You must be at least 16 years old';
        }

        if (currentStep === 2) {
            if (!formData.address.trim()) newErrors.address = 'Home address is required';
            if (!formData.phone.trim()) newErrors.phone = 'Mobile number is required';
            else if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter a valid 11-digit mobile number';
            if (!formData.email.trim()) newErrors.email = 'Email address is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';
        }

        if (currentStep === 4) {
            if (!formData.password) newErrors.password = 'Password is required';
            else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        setErrors({}); // Clear errors when going back
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 4) {
            nextStep();
        } else {
            if (validateStep(4)) {
                console.log('Registration attempt:', formData);
                if (onRegister) onRegister();
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-form-section">
                    <div className="register-header">
                        <button className="back-to-login" onClick={onBack}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Back to Login
                        </button>
                        <h1>Enrollment Form</h1>
                        <p>Part {step} of 4: {
                            step === 1 ? 'Personal Details' :
                                step === 2 ? 'Address & Contact' :
                                    step === 3 ? 'Training Program' : 'Account Setup'
                        }</p>

                        <div className="step-indicator">
                            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
                            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
                            <div className={`step-line ${step >= 4 ? 'active' : ''}`}></div>
                            <div className={`step-dot ${step >= 4 ? 'active' : ''}`}></div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="register-form">
                        {step === 1 && (
                            <div className="form-step">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>First Name</label>
                                        <input className={errors.firstName ? 'error' : ''} name="firstName" type="text" placeholder="Juan" value={formData.firstName} onChange={handleChange} />
                                        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label>Middle Name</label>
                                        <input name="middleName" type="text" placeholder="Santos" value={formData.middleName} onChange={handleChange} />
                                    </div>
                                    <div className="input-group">
                                        <label>Last Name</label>
                                        <input className={errors.lastName ? 'error' : ''} name="lastName" type="text" placeholder="Dela Cruz" value={formData.lastName} onChange={handleChange} />
                                        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Birth Date</label>
                                        <input className={errors.dob ? 'error' : ''} name="dob" type="date" value={formData.dob} onChange={handleChange} />
                                        {errors.dob && <span className="error-text">{errors.dob}</span>}
                                    </div>
                                    <div className="input-group" style={{ flex: '0.4' }}>
                                        <label>Age</label>
                                        <input className={errors.age ? 'error' : ''} name="age" type="number" min="1" placeholder="20" value={formData.age} onChange={handleChange} />
                                        {errors.age && <span className="error-text">{errors.age}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label>Gender</label>
                                        <select name="gender" value={formData.gender} onChange={handleChange}>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Civil Status</label>
                                        <select name="civilStatus" value={formData.civilStatus} onChange={handleChange}>
                                            <option value="single">Single</option>
                                            <option value="married">Married</option>
                                            <option value="widowed">Widowed</option>
                                            <option value="divorced">Divorced</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Nationality</label>
                                        <select name="nationality" value={formData.nationality} onChange={handleChange}>
                                            <option value="filipino">Filipino</option>
                                            <option value="american">American</option>
                                            <option value="british">British</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="form-step">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Home Address</label>
                                        <input className={errors.address ? 'error' : ''} name="address" type="text" placeholder="House No., Street, Barangay, City" value={formData.address} onChange={handleChange} />
                                        {errors.address && <span className="error-text">{errors.address}</span>}
                                    </div>
                                    <div className="input-group" style={{ flex: '0.3' }}>
                                        <label>Zip Code</label>
                                        <input name="zipCode" type="text" placeholder="1234" value={formData.zipCode} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Place of Birth</label>
                                        <input name="birthPlace" type="text" placeholder="City or Province" value={formData.birthPlace} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Mobile Number</label>
                                        <input className={errors.phone ? 'error' : ''} name="phone" type="tel" maxLength="11" placeholder="09XX XXX XXXX" value={formData.phone} onChange={handleChange} />
                                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                                    </div>
                                    <div className="input-group">
                                        <label>Alternative Contact No.</label>
                                        <input name="contactNumber" type="tel" maxLength="11" placeholder="09XX XXX XXXX" value={formData.contactNumber} onChange={handleChange} />
                                    </div>
                                </div>

                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Email Address</label>
                                        <input className={errors.email ? 'error' : ''} name="email" type="email" placeholder="example@gmail.com" value={formData.email} onChange={handleChange} />
                                        {errors.email && <span className="error-text">{errors.email}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="form-step">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Type of Program</label>
                                        <select name="programType" value={formData.programType} onChange={handleChange}>
                                            <option value="face-to-face-tdc">Face to Face TDC</option>
                                            <option value="online-tdc">Online TDC</option>
                                            <option value="pdc-motor-auto">PDC Motor (Automatic)</option>
                                            <option value="pdc-motor-manual">PDC Motor (Manual)</option>
                                            <option value="pdc-car-auto">PDC Car (Automatic)</option>
                                            <option value="pdc-car-manual">PDC Car (Manual)</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Training Duration</label>
                                        <select name="course" value={formData.course} onChange={handleChange}>
                                            <option value="tdc">TDC (Theories Only)</option>
                                            <option value="pdc-8">PDC 8 Hours Practice</option>
                                            <option value="pdc-15">PDC 15 Hours Practice</option>
                                            <option value="pdc-20">PDC 20 Hours Practice</option>
                                            <option value="combo">Full Combo Package</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Designated Branch</label>
                                        <select name="branch" value={formData.branch} onChange={handleChange}>
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
                                            <option value="bacoor">San Mateo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="form-step">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Account Password</label>
                                        <input className={errors.password ? 'error' : ''} name="password" type="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
                                        {errors.password ? <span className="error-text">{errors.password}</span> : <small style={{ color: '#64748b', marginTop: '4px' }}>At least 8 characters recommended.</small>}
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label>Re-type Password</label>
                                        <input className={errors.confirmPassword ? 'error' : ''} name="confirmPassword" type="password" placeholder="••••••••" value={formData.confirmPassword} onChange={handleChange} />
                                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="form-nav">
                            {step > 1 && (
                                <button type="button" className="prev-btn" onClick={prevStep}>
                                    Previous
                                </button>
                            )}
                            <button type="submit" className="register-btn">
                                {step === 4 ? 'COMPLETE ENROLLMENT' : 'CONTINUE'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="register-info-section">
                    <div className="info-content">
                        <img src={logo} alt="Logo" className="info-logo" />
                        <h2>Master School</h2>
                        <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>Join the best driving school and master the road today.</p>
                        <ul className="benefits-list">
                            <li className={step >= 1 ? 'done' : ''}>Personal Details</li>
                            <li className={step >= 2 ? 'done' : ''}>Address & Contact</li>
                            <li className={step >= 3 ? 'done' : ''}>Training Program</li>
                            <li className={step >= 4 ? 'done' : ''}>Account Setup</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
