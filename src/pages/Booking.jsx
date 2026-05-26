import { useState, useEffect } from 'react';

// 1. Zidna { isDarkMode } bil-props fo2 (mn App.jsx)
function Booking({ isDarkMode }) {
  
  const [bookings, setBookings] = useState(() => {
    const savedBookings = localStorage.getItem('careclinic_bookings');
    return savedBookings ? JSON.parse(savedBookings) : [
      {
        id: 1,
        name: 'waed baydoun',
        email: '72510043@students.liu.edu.lb',
        disease: 'flu',
        doctor: 'Dr Ahmed',
        time: '5/9/2026, 11:29:43 AM'
      }
    ];
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [disease, setDisease] = useState('');
  const [doctor, setDoctor] = useState('Dr Ahmed');
  
  // 2. Shelna "isDarkMode" state hon la2an sarna 3am n-jibha prop
  const [showBookings, setShowBookings] = useState(true); 
  const [sortOrder, setSortOrder] = useState('newest');    

  useEffect(() => {
    localStorage.setItem('careclinic_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!name || !email || !disease) return;

    const newAppointment = {
      id: Date.now(), 
      name,
      email,
      disease,
      doctor,
      time: new Date().toLocaleString()
    };

    setBookings([newAppointment, ...bookings]); 
    setName(''); 
    setEmail('');
    setDisease('');
    setShowBookings(true); 
  };

  const handleDelete = (id) => {
    setBookings(bookings.filter(item => item.id !== id));
  };

  const processedBookings = [...bookings].sort((a, b) => {
    return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
  });

  return (
    // 3. Bi-ya7od el class auto mn l-prop (App.jsx)
    <div className={`booking-container ${isDarkMode ? 'dark-mode' : ''}`}>
      
      {/* Top Banner (Shelna l-toggle wrapper klllo!) */}
      <div className="blue-banner">
        <div>
          <h1>📅 Booking</h1>
          <p>Book your appointment easily</p>
        </div>
      </div>

      {/* Inputs Form */}
      <form className="inputs-bar" onSubmit={handleSend}>
        <input type="text" placeholder="👤 Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input 
      type="email" 
       name="user_email"            /* 🌟 Zid hay kermal el browser ye7faz l-inputs */
       autoComplete="email"         /* 🌟 Zid hay (Capital C) kermal yfarji l-emails l-2dam */
      placeholder="📧 Email" 
     value={email} 
      onChange={(e) => setEmail(e.target.value)} 
/>
        <input type="text" placeholder="🩺 Disease" value={disease} onChange={(e) => setDisease(e.target.value)} />
        <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
          <option value="Dr Ahmed">Dr Ahmed</option>
          <option value="Dr Sarah">Dr Sarah</option>
        </select>
        <button type="submit" className="btn-send">✈️ Send</button>
      </form>

      {/* Filter Buttons */}
      <div className="filters-row">
        <button type="button" className="f-btn btn-blue" onClick={() => setSortOrder('newest')}>
          Newest First
        </button>
        <button type="button" className="f-btn btn-purple" onClick={() => setSortOrder('oldest')}>
          Oldest First
        </button>
        <button type="button" className="f-btn btn-red" onClick={() => setShowBookings(!showBookings)}>
          {showBookings ? 'Hide All' : 'Show All'}
        </button>
      </div>

      {/* Bookings List Output */}
      <div className="bookings-list">
        <h3>Your Bookings</h3>
        
        {showBookings && processedBookings.map((item) => (
          <div key={item.id} className="booking-card">
            <div className="steth-icon">🩺</div>
            <div className="info-col"><span className="lbl">NAME</span><span className="val">{item.name}</span></div>
            <div className="info-col"><span className="lbl">EMAIL</span><span className="val">{item.email}</span></div>
            <div className="info-col"><span className="lbl">DISEASE</span><span className="val">{item.disease}</span></div>
            <div className="info-col"><span className="lbl">DOCTOR</span><span className="val">{item.doctor}</span></div>
            <div className="info-col"><span className="lbl">TIME</span><span className="val">{item.time}</span></div>
            <button type="button" className="btn-delete" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Booking;