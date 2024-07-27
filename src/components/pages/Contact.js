import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Feel free to reach out to us through any of the following platforms. We look forward to connecting with you!
        </p>
        <ul className="contact-list">
          <li className="contact-item">
            <a href="mailto:your-email@example.com" className="contact-link">
              <i className="fas fa-envelope"></i> your-email@example.com
            </a>
          </li>
          <li className="contact-item">
            <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </li>
          <li className="contact-item">
            <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer" className="contact-link">
              <i className="fab fa-github"></i> GitHub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactPage;
