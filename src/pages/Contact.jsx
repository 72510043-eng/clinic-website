import { useState } from 'react'; // 🌟 Zidna el useState hon

function Contact() {
  // 🌟 1. Khla2na states kermal n-seif el ktabe jowwa l-boxes
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 2. Hal daddale r7 t-talla3 l-alert w tem7e l-content
  const handleSubmit = (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    
    alert("Thank you! Your message has been sent successfully. 🚀");

    // 🌟 Hon l-se7er: b-nem7e l-inputs deghri ba3d l-alert
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-page">
      {/* القسم اليساري */}
      <div className="contact-info">
        <h1>Let's Connect</h1>
        <p>We're here to help you. Reach out to us anytime.</p>
        <p>📍 Branches: Beirut Main, Tripoli City</p>
        <p>📧 Email: contact@careclinic.com</p>
        <p>📞 Phone: +961 01 234 567</p>
        
        <p className="social-label"><strong>Social:</strong></p>
        <div className="social-links">
          <a href="https://facebook.com/your-page" target="_blank" rel="noopener noreferrer" className="social-item">
            <span>📘</span> Facebook
          </a>
          <a href="https://instagram.com/your-handle" target="_blank" rel="noopener noreferrer" className="social-item">
            <span>📸</span> Instagram
          </a>
          <a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="social-item">
            <span>🐦</span> Twitter
          </a>
        </div>
      </div>

      {/* القسم اليميني (الفورم) */}
      <form className="contact-form" onSubmit={handleSubmit}>
        <h3>Send us your feedback</h3>
        
        {/* 🌟 3. Rabtna el value wal onChange b-kel input box */}
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        
        <textarea 
          placeholder="How can we improve?" 
          rows="4" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          required
        ></textarea>
        
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;