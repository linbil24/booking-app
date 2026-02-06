import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './Module/Dashboard';
import Register from './components/Register';
import BookNow from './components/book-now';
import './App.css';

function App() {
  // Simple state to toggle between Login, Admin Dashboard, Register, and Booking
  // Options: 'login', 'admin', 'register', 'booking'
  const [view, setView] = useState('login');

  return (
    <div className="App">
      {view === 'login' && <Login onLogin={() => setView('admin')} onRegister={() => setView('register')} onBook={() => setView('booking')} />}
      {view === 'admin' && <Dashboard onBack={() => setView('login')} />}
      {view === 'register' && <Register onBack={() => setView('login')} onRegister={() => setView('admin')} />}
      {view === 'booking' && <BookNow onBack={() => setView('login')} />}
    </div>
  );
}

export default App;
