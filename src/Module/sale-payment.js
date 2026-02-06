import React, { useState } from 'react';
import './css/sale.css';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

const SalePayment = () => {
    const [period, setPeriod] = useState('This Month');

    // Mock data for sales overview
    const stats = [
        { label: 'Gross Revenue', value: 'P 124,500', trend: '+12.5%', color: 'blue' },
        { label: 'Completed Payments', value: '42', trend: '+8%', color: 'green' },
        { label: 'Pending Collections', value: 'P 18,200', trend: '-2.4%', color: 'orange' },
        { label: 'Refunds / Cancelled', value: 'P 4,500', trend: '+0.5%', color: 'red' },
    ];

    // Chart data
    const monthlyData = [
        { name: 'Week 1', amount: 25000 },
        { name: 'Week 2', amount: 32000 },
        { name: 'Week 3', amount: 41000 },
        { name: 'Week 4', amount: 26500 },
    ];

    const paymentMethods = [
        { name: 'GCash', value: 45, color: '#007dfe' },
        { name: 'Cash', value: 30, color: '#22c55e' },
        { name: 'Bank Transfer', value: 15, color: '#f59e0b' },
        { name: 'Others', value: 10, color: '#64748b' },
    ];

    // Recent Transactions
    const transactions = [
        { id: 'TXN-9821', student: 'Juan Dela Cruz', date: '2024-03-05', amount: 'P 2,500', method: 'GCash', status: 'Success' },
        { id: 'TXN-9822', student: 'Maria Santos', date: '2024-03-05', amount: 'P 5,000', method: 'Cash', status: 'Success' },
        { id: 'TXN-9823', student: 'Jose Rizal', date: '2024-03-04', amount: 'P 2,500', method: 'PayMaya', status: 'Success' },
        { id: 'TXN-9824', student: 'Andres Bonifacio', date: '2024-03-04', amount: 'P 4,500', method: 'GCash', status: 'Pending' },
        { id: 'TXN-9825', student: 'Emilio Aguinaldo', date: '2024-03-03', amount: 'P 2,500', method: 'Bank Transfer', status: 'Success' },
    ];

    return (
        <div className="sale-module">
            <div className="sale-header">
                <div>
                    <h2>Sales & Financials</h2>
                    <p>Financial overview and transaction history</p>
                </div>
                <div className="header-controls">
                    <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                    </select>
                    <button className="print-report-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                        Financial Report
                    </button>
                </div>
            </div>

            <div className="revenue-stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className={`rev-stat-card ${stat.color}`}>
                        <div className="rev-info">
                            <span className="label">{stat.label}</span>
                            <div className="value-group">
                                <h3>{stat.value}</h3>
                                <span className={`trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                        <div className="rev-icon">
                            {/* Simple dynamic circle decoration */}
                            <div className="decoration-circle"></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sale-charts-row">
                <div className="main-sale-chart">
                    <div className="chart-card">
                        <div className="card-header">
                            <h3>Revenue Overview</h3>
                            <span>Weekly Comparison</span>
                        </div>
                        <div className="chart-body">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="amount" fill="#1a4fba" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="payment-method-chart">
                    <div className="chart-card">
                        <div className="card-header">
                            <h3>Payment Methods</h3>
                            <span>By Usage (%)</span>
                        </div>
                        <div className="chart-body pie-container">
                            <ResponsiveContainer width="100%" height={240}>
                                <PieChart>
                                    <Pie
                                        data={paymentMethods}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {paymentMethods.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="pie-legend">
                                {paymentMethods.map((pm, idx) => (
                                    <div key={idx} className="legend-item">
                                        <span className="dot" style={{ background: pm.color }}></span>
                                        <span className="pm-name">{pm.name}</span>
                                        <span className="pm-val">{pm.value}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="transactions-section">
                <div className="section-header">
                    <h3>Recent Transactions</h3>
                    <button className="view-all-link">View All History</button>
                </div>
                <div className="txn-table-wrapper">
                    <table className="txn-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Student Name</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(txn => (
                                <tr key={txn.id}>
                                    <td className="txn-id">{txn.id}</td>
                                    <td className="st-name">{txn.student}</td>
                                    <td className="date">{txn.date}</td>
                                    <td>
                                        <span className={`method-tag ${txn.method.toLowerCase()}`}>
                                            {txn.method}
                                        </span>
                                    </td>
                                    <td className="amount">{txn.amount}</td>
                                    <td>
                                        <span className={`status-pill ${txn.status.toLowerCase()}`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SalePayment;
