import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import './App.css';

export default function App() {
  /* STATE MANAGEMENT */
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem('cvData');
    return saved ? JSON.parse(saved) : {
      personal: { name: '', email: '', phone: '', address: '' },
      education: [],
      experience: [],
      skills: ''
    };
  });

  /* SIDE EFFECTS */
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  /* COMPONENT */
  return (
    <div className="app-container">
      <Header />
      <div className="form-preview-container">
        <CVForm {...{cvData, setCvData}} />
        <CVPreview {...{cvData, setCvData}} />
      </div>
    </div>
  );
}
