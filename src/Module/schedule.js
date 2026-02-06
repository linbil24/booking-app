import React, { useState } from 'react';
import './css/schedule.css';

const Schedule = () => {
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [viewDate, setViewDate] = useState(new Date()); // For month navigation
    const [activeType, setActiveType] = useState('tdc'); // 'tdc' or 'pdc'
    const [showModal, setShowModal] = useState(false);
    const [showStudentModal, setShowStudentModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [formData, setFormData] = useState({
        type: 'tdc',
        time: '',
        session: '',
        slots: 15,
        instructor: ''
    });

    // Mock data with dates
    const [slots, setSlots] = useState([
        {
            id: 1, date: today, type: 'tdc', time: '08:00 AM - 12:00 PM', session: 'Morning', slots: 15, available: 12, instructor: 'Instructor A',
            students: [
                { id: 101, name: 'Juan Dela Cruz', status: 'Confirmed', phone: '09171234567' },
                { id: 102, name: 'Maria Santos', status: 'Pending', phone: '09187654321' },
                { id: 103, name: 'Jose Rizal', status: 'Confirmed', phone: '09199998888' }
            ]
        },
        {
            id: 2, date: today, type: 'tdc', time: '01:00 PM - 05:00 PM', session: 'Afternoon', slots: 15, available: 14, instructor: 'Instructor B',
            students: [
                { id: 104, name: 'Andres Bonifacio', status: 'Confirmed', phone: '09201112222' }
            ]
        },
        { id: 3, date: today, type: 'pdc', time: '07:00 AM - 09:00 AM', session: 'Morning Slot 1', slots: 1, available: 0, instructor: 'Instructor C', students: [{ id: 105, name: 'Emilio Aguinaldo', status: 'Confirmed', phone: '09213334444' }] },
        { id: 4, date: today, type: 'pdc', time: '09:00 AM - 11:00 AM', session: 'Morning Slot 2', slots: 1, available: 1, instructor: 'Instructor C', students: [] },
        { id: 5, date: today, type: 'pdc', time: '01:00 PM - 03:00 PM', session: 'Afternoon Slot 1', slots: 1, available: 1, instructor: 'Instructor D', students: [] },
    ]);

    const filteredSlots = slots.filter(slot => slot.type === activeType && slot.date === selectedDate);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'slots' && value < 1 && value !== '') return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveSlot = (e) => {
        e.preventDefault();
        if (editingId) {
            setSlots(slots.map(slot =>
                slot.id === editingId
                    ? { ...slot, ...formData, slots: parseInt(formData.slots) }
                    : slot
            ));
        } else {
            const newSlot = {
                id: slots.length + 1,
                date: selectedDate,
                ...formData,
                available: formData.slots,
                slots: parseInt(formData.slots),
                students: []
            };
            setSlots([...slots, newSlot]);
        }
        closeModal();
    };

    const openModal = (slot = null) => {
        if (slot) {
            setEditingId(slot.id);
            setFormData({
                type: slot.type,
                time: slot.time,
                session: slot.session,
                slots: slot.slots,
                instructor: slot.instructor
            });
        } else {
            setEditingId(null);
            setFormData({
                type: activeType,
                time: '',
                session: '',
                slots: activeType === 'tdc' ? 15 : 1,
                instructor: ''
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingId(null);
    };

    const openStudentModal = (slot) => {
        setSelectedSlot(slot);
        setShowStudentModal(true);
    };

    return (
        <div className="schedule-module">
            <div className="schedule-header">
                <div className="type-toggle">
                    <button
                        className={activeType === 'tdc' ? 'active' : ''}
                        onClick={() => setActiveType('tdc')}
                    >
                        TDC (Theoretical)
                    </button>
                    <button
                        className={activeType === 'pdc' ? 'active' : ''}
                        onClick={() => setActiveType('pdc')}
                    >
                        PDC (Practical)
                    </button>
                </div>

            </div>

            <div className="schedule-content">
                <div className="calendar-view">
                    <div className="calendar-header-nav">
                        <button className="month-nav-btn" onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <h3>{viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
                        <button className="month-nav-btn" onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    <div className="calendar-grid">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="calendar-day-header">{day}</div>
                        ))}
                        {(() => {
                            const year = viewDate.getFullYear();
                            const month = viewDate.getMonth();
                            const firstDay = new Date(year, month, 1).getDay();
                            const daysInMonth = new Date(year, month + 1, 0).getDate();
                            const days = [];

                            // Padding for start of month
                            for (let i = 0; i < firstDay; i++) {
                                days.push(<div key={`pad-${i}`} className="calendar-day empty"></div>);
                            }

                            // Actual days
                            for (let d = 1; d <= daysInMonth; d++) {
                                const dateObj = new Date(year, month, d);
                                const dateStr = dateObj.toISOString().split('T')[0];
                                const isSelected = selectedDate === dateStr;
                                const isToday = today === dateStr;
                                const hasSlots = slots.some(s => s.date === dateStr);

                                days.push(
                                    <div
                                        key={d}
                                        className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${hasSlots ? 'has-slots' : ''}`}
                                        onClick={() => setSelectedDate(dateStr)}
                                    >
                                        <span className="day-num">{d}</span>
                                        <button
                                            className="quick-add-slot"
                                            title="Add Slot for this date"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedDate(dateStr);
                                                openModal();
                                            }}
                                        >
                                            +
                                        </button>
                                        {hasSlots && <div className="slot-dot"></div>}
                                    </div>
                                );
                            }
                            return days;
                        })()}
                    </div>
                </div>

                <div className="slots-grid">
                    <div className="section-title">
                        <h3>Available Slots for {new Date(selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
                        <span className="badge">{filteredSlots.length} Slots Found</span>
                    </div>

                    <div className="slots-list">
                        {filteredSlots.length > 0 ? filteredSlots.map(slot => (
                            <div key={slot.id} className="slot-card">
                                <div className="slot-time">
                                    <div className="clock-icon">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <span>{slot.time}</span>
                                </div>
                                <div className="slot-details">
                                    <h4>{slot.session}</h4>
                                    <p>{slot.instructor}</p>
                                </div>
                                <div className="slot-capacity">
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${((slot.slots - slot.available) / slot.slots) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span>{slot.slots - slot.available} / {slot.slots} Booked</span>
                                </div>
                                <div className="slot-actions">
                                    <button className="edit-btn" onClick={() => openModal(slot)}>Edit</button>
                                    <button className="view-students-btn" onClick={() => openStudentModal(slot)}>
                                        Students ({slot.students?.length || 0})
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="no-slots">
                                <p>No slots scheduled for this date.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Edit/Add Slot Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{editingId ? 'Edit Slot' : 'Set New Slot'}</h2>
                            <button className="close-modal" onClick={closeModal}>&times;</button>
                        </div>
                        <form onSubmit={handleSaveSlot}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Type</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="tdc">TDC (Theoretical)</option>
                                        <option value="pdc">PDC (Practical)</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Instructor Name</label>
                                    <input
                                        type="text"
                                        name="instructor"
                                        placeholder="e.g. Instructor A"
                                        value={formData.instructor}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Session Title</label>
                                        <input
                                            type="text"
                                            name="session"
                                            placeholder="e.g. Morning Session"
                                            value={formData.session}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Total Capacity</label>
                                        <input
                                            type="number"
                                            name="slots"
                                            min="1"
                                            value={formData.slots}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Time Range</label>
                                    <input
                                        type="text"
                                        name="time"
                                        placeholder="e.g. 08:00 AM - 12:00 PM"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="confirm-btn">{editingId ? 'Update Slot' : 'Create Slot'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View Students Modal */}
            {showStudentModal && selectedSlot && (
                <div className="modal-overlay">
                    <div className="modal-container student-list-modal">
                        <div className="modal-header">
                            <div>
                                <h2>Enrolled Students</h2>
                                <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                                    {selectedSlot.session} | {selectedSlot.time}
                                </p>
                            </div>
                            <button className="close-modal" onClick={() => setShowStudentModal(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="student-table-wrapper">
                                <table className="student-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Contact</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedSlot.students?.length > 0 ? selectedSlot.students.map(student => (
                                            <tr key={student.id}>
                                                <td className="st-name">{student.name}</td>
                                                <td className="st-phone">{student.phone}</td>
                                                <td>
                                                    <span className={`st-status ${student.status.toLowerCase()}`}>
                                                        {student.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                                    No students enrolled in this slot yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="confirm-btn" onClick={() => setShowStudentModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedule;
