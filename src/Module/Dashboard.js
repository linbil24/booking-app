import React, { useState } from 'react';
import './css/Dashboard.css';
import logo from '../image/logo.jpg';
import Schedule from './schedule';
import Booking from './booking';
import SalePayment from './sale-payment';
import UserManagement from './user';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    FunnelChart,
    Funnel,
    LabelList
} from 'recharts';

const funnelData = [
    { value: 1000, name: 'Visitors', fill: '#1a4fba' },
    { value: 750, name: 'Inquiries', fill: '#3b82f6' },
    { value: 500, name: 'Enrolled', fill: '#60a5fa' },
    { value: 380, name: 'Active', fill: '#93c5fd' },
    { value: 200, name: 'Graduates', fill: '#bfdbfe' },
];

const data = [
    { name: 'Jan', students: 40, revenue: 2400 },
    { name: 'Feb', students: 30, revenue: 1398 },
    { name: 'Mar', students: 20, revenue: 9800 },
    { name: 'Apr', students: 27, revenue: 3908 },
    { name: 'May', students: 18, revenue: 4800 },
    { name: 'Jun', students: 23, revenue: 3800 },
    { name: 'Jul', students: 34, revenue: 4300 },
];

const Dashboard = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [studentData, setStudentData] = useState({
        name: '',
        course: 'TDC - Online',
        branch: 'Main Branch',
        date: '',
        status: 'Pending'
    });

    const handleStudentInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData({ ...studentData, [name]: value });
    };

    const handleAddStudent = (e) => {
        e.preventDefault();
        console.log('Adding student:', studentData);
        setShowStudentModal(false);
        // Reset form
        setStudentData({
            name: '',
            course: 'TDC - Online',
            branch: 'Main Branch',
            date: '',
            status: 'Pending'
        });
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <img src={logo} alt="Master School" />
                    <h2>Master School</h2>
                </div>

                <nav className="sidebar-menu">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Dashboard
                    </button>

                    <button
                        onClick={() => setActiveTab('schedules')}
                        className={`menu-item ${activeTab === 'schedules' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        Schedules (TDC/PDC)
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`menu-item ${activeTab === 'bookings' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        Bookings
                    </button>
                    <button
                        onClick={() => setActiveTab('sales')}
                        className={`menu-item ${activeTab === 'sales' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        Sales & Payments
                    </button>
                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`menu-item ${activeTab === 'analytics' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                        Analytics
                    </button>

                    <button
                        onClick={() => setActiveTab('users')}
                        className={`menu-item ${activeTab === 'users' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        User Management
                    </button>

                    <button
                        onClick={() => setActiveTab('news')}
                        className={`menu-item ${activeTab === 'news' ? 'active' : ''}`}
                    >
                        <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9"></path><path d="M7 8h10"></path><path d="M7 12h10"></path><path d="M7 16h10"></path></svg>
                        News & Events
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="main-header">
                    <div className="header-title">
                        <div className="header-nav" style={{ justifyContent: 'flex-start' }}>
                            <button className="back-btn" onClick={onBack}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                                Logout
                            </button>
                        </div>
                        <h1>
                            {activeTab === 'dashboard' ? 'Dashboard Overview' :
                                activeTab === 'schedules' ? 'Schedule Management' :
                                    activeTab === 'bookings' ? 'Booking Management' :
                                        activeTab === 'sales' ? 'Sales & Financials' :
                                            'User Management'}
                        </h1>
                        <p>Welcome back, Admin</p>
                    </div>
                    <div className="branch-selector">
                        <select defaultValue="main">
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
                </header>

                {activeTab === 'dashboard' ? (
                    <>
                        {/* Stats Cards */}
                        <section className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-info">
                                    <span>Total Enrolled Students</span>
                                    <h2>1,245</h2>
                                </div>
                                <div className="stat-icon blue">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-info">
                                    <span>Total Sales (October)</span>
                                    <h2>₱ 324k</h2>
                                </div>
                                <div className="stat-icon green">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                </div>
                            </div>

                            <div className="stat-card">
                                <div className="stat-info">
                                    <span>Pending Bookings</span>
                                    <h2>18</h2>
                                </div>
                                <div className="stat-icon orange">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                            </div>
                        </section>

                        {/* Charts Section */}
                        <section className="charts-grid section">
                            <div className="chart-card">
                                <div className="chart-header">
                                    <h3>Monthly Revenue</h3>
                                    <span>Financial Trends</span>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <AreaChart
                                            data={data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#1a4fba" stopOpacity={0.1} />
                                                    <stop offset="95%" stopColor="#1a4fba" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="revenue"
                                                stroke="#1a4fba"
                                                fillOpacity={1}
                                                fill="url(#colorRevenue)"
                                                strokeWidth={3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="chart-card">
                                <div className="chart-header">
                                    <h3>Monthly Enrollments</h3>
                                    <span>Student Acquisition</span>
                                </div>
                                <div style={{ width: '100%', height: 300 }}>
                                    <ResponsiveContainer>
                                        <BarChart
                                            data={data}
                                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis
                                                dataKey="name"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                                dy={10}
                                            />
                                            <YAxis
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{ fill: '#94a3b8', fontSize: 12 }}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Legend verticalAlign="top" height={36} />
                                            <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </section>

                        {/* Recent Enrollees Table */}
                        <section className="data-section">
                            <div className="section-header">
                                <h2>Recent Enrollees</h2>
                                <button className="add-btn" onClick={() => setShowStudentModal(true)}>Add Student</button>
                            </div>

                            <div className="table-wrapper">
                                <table className="custom-table">
                                    <thead>
                                        <tr>
                                            <th>Student Name</th>
                                            <th>Course</th>
                                            <th>Branch</th>
                                            <th>Schedule</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="student-name">Juan Dela Cruz</td>
                                            <td>TDC - Online</td>
                                            <td>Anywhere</td>
                                            <td>Jan 15, 2024</td>
                                            <td><span className="status-badge full">Full Payment</span></td>
                                        </tr>
                                        <tr>
                                            <td className="student-name">Maria Clara</td>
                                            <td>PDC - Manual Sedan</td>
                                            <td>V. Luna</td>
                                            <td>Jan 18, 2024 (AM)</td>
                                            <td><span className="status-badge down">Downpayment</span></td>
                                        </tr>
                                        <tr>
                                            <td className="student-name">Pedro Penduko</td>
                                            <td>PDC - Motorcycle</td>
                                            <td>Marikina</td>
                                            <td>Jan 20, 2024 (PM)</td>
                                            <td><span className="status-badge pending">Pending</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </>
                ) : activeTab === 'schedules' ? (
                    <Schedule />
                ) : activeTab === 'bookings' ? (
                    <Booking />
                ) : activeTab === 'sales' ? (
                    <SalePayment />
                ) : activeTab === 'analytics' ? (
                    <div className="analytics-view">
                        <section className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-info">
                                    <h3>Growth Rate</h3>
                                    <div className="stat-value">+12.5%</div>
                                    <div className="stat-label">vs last month</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-info">
                                    <h3>Retention</h3>
                                    <div className="stat-value">94.2%</div>
                                    <div className="stat-label">Student satisfaction</div>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-info">
                                    <h3>Traffic</h3>
                                    <div className="stat-value">12.8k</div>
                                    <div className="stat-label">Page views</div>
                                </div>
                            </div>
                        </section>
                        <section className="charts-grid">
                            <div className="chart-card">
                                <div className="chart-header">
                                    <h3>Conversion Funnel</h3>
                                </div>
                                <div className="chart-wrapper" style={{ height: '350px', padding: '20px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <FunnelChart>
                                            <Tooltip
                                                contentStyle={{
                                                    borderRadius: '12px',
                                                    border: 'none',
                                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                }}
                                            />
                                            <Funnel
                                                dataKey="value"
                                                data={funnelData}
                                                isAnimationActive
                                            >
                                                <LabelList
                                                    position="right"
                                                    fill="#64748b"
                                                    stroke="none"
                                                    dataKey="name"
                                                    fontSize={12}
                                                />
                                            </Funnel>
                                        </FunnelChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : activeTab === 'news' ? (
                    <div className="news-view">
                        <div className="section-header">
                            <h2>News & Announcements</h2>
                            <button className="add-btn">Post New</button>
                        </div>
                        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                            <div className="news-card" style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                                <div className="news-tag" style={{ background: '#dcfce7', color: '#16a34a', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '12px' }}>EVENT</div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Summer Driving Bootcamp 2024</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>Join our intensive 2-week course this summer. Limited slots available for all branches.</p>
                                <div className="news-footer" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>June 12, 2024</span>
                                    <button style={{ color: '#3b82f6', border: 'none', background: 'none', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                                </div>
                            </div>
                            <div className="news-card" style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '1px solid #e2e8f0' }}>
                                <div className="news-tag" style={{ background: '#fee2e2', color: '#dc2626', display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '12px' }}>URGENT</div>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>System Maintenance Notice</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6' }}>Online TDC platform will be undergoing scheduled maintenance this Sunday from 2AM to 5AM.</p>
                                <div className="news-footer" style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>June 10, 2024</span>
                                    <button style={{ color: '#3b82f6', border: 'none', background: 'none', fontWeight: '600', cursor: 'pointer' }}>Edit</button>
                                </div>
                            </div>
                        </div>

                        <div className="section-header" style={{ marginTop: '40px' }}>
                            <h2>Featured Videos & Tutorials</h2>
                        </div>
                        <div className="video-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', marginTop: '20px' }}>
                            <div className="video-card" style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div className="video-thumb" style={{ height: '180px', background: '#1e293b', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="play-btn-circle" style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', cursor: 'pointer' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid white', marginLeft: '5px' }}></div>
                                    </div>
                                    <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>12:45</span>
                                </div>
                                <div className="video-info" style={{ padding: '20px' }}>
                                    <div style={{ color: '#3b82f6', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Tutorial</div>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#1e293b' }}>Parallel Parking Mastery</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>Step-by-step guide to mastering the hardest parking maneuver.</p>
                                </div>
                            </div>
                            <div className="video-card" style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div className="video-thumb" style={{ height: '180px', background: '#334155', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="play-btn-circle" style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', cursor: 'pointer' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid white', marginLeft: '5px' }}></div>
                                    </div>
                                    <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>08:20</span>
                                </div>
                                <div className="video-info" style={{ padding: '20px' }}>
                                    <div style={{ color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>Highlights</div>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#1e293b' }}>Student Success Story: Maria Clara</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>Hear from our top graduate about her journey at Master School.</p>
                                </div>
                            </div>
                            <div className="video-card" style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                <div className="video-thumb" style={{ height: '180px', background: '#0f172a', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div className="play-btn-circle" style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)', cursor: 'pointer' }}>
                                        <div style={{ width: 0, height: 0, borderTop: '10px solid transparent', borderBottom: '10px solid transparent', borderLeft: '15px solid white', marginLeft: '5px' }}></div>
                                    </div>
                                    <span style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>15:10</span>
                                </div>
                                <div className="video-info" style={{ padding: '20px' }}>
                                    <div style={{ color: '#f59e0b', fontSize: '0.75rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase' }}>TDC Online</div>
                                    <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: '#1e293b' }}>Traffic Signs & Regulations</h3>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5' }}>Essential knowledge for your student permit application.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <UserManagement />
                )}
                {/* Add Student Modal */}
                {showStudentModal && (
                    <div className="modal-overlay">
                        <div className="modal-container user-modal">
                            <div className="modal-header">
                                <h2>Enroll New Student</h2>
                                <button className="close-modal" onClick={() => setShowStudentModal(false)}>&times;</button>
                            </div>
                            <form onSubmit={handleAddStudent}>
                                <div className="modal-body">
                                    <div className="input-group">
                                        <label>Student Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="e.g. Juan Dela Cruz"
                                            value={studentData.name}
                                            onChange={handleStudentInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                                        <div className="input-group" style={{ flex: 1 }}>
                                            <label>Course Type</label>
                                            <select name="course" value={studentData.course} onChange={handleStudentInputChange}>
                                                <option>TDC - Online</option>
                                                <option>TDC - Face to Face</option>
                                                <option>PDC - Manual Sedan</option>
                                                <option>PDC - Automatic Sedan</option>
                                                <option>PDC - Motorcycle</option>
                                            </select>
                                        </div>
                                        <div className="input-group" style={{ flex: 1 }}>
                                            <label>Branch</label>
                                            <select name="branch" value={studentData.branch} onChange={handleStudentInputChange}>
                                                <option>Main Branch</option>
                                                <option>V. Luna Branch</option>
                                                <option>Marikina Branch</option>
                                                <option>Fairview Branch</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row" style={{ display: 'flex', gap: '15px' }}>
                                        <div className="input-group" style={{ flex: 1 }}>
                                            <label>Schedule Date</label>
                                            <input
                                                type="date"
                                                name="date"
                                                value={studentData.date}
                                                onChange={handleStudentInputChange}
                                                required
                                            />
                                        </div>
                                        <div className="input-group" style={{ flex: 1 }}>
                                            <label>Initial Status</label>
                                            <select name="status" value={studentData.status} onChange={handleStudentInputChange}>
                                                <option>Pending</option>
                                                <option>Downpayment</option>
                                                <option>Full Payment</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="prev-btn" onClick={() => setShowStudentModal(false)}>Cancel</button>
                                    <button type="submit" className="add-btn">Enroll Student</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
