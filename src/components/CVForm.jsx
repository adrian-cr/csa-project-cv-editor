import React, { useState } from 'react';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 2025 - i);

export default function CVForm({ cvData, setCvData }) {
  /* STATE MANAGEMENT */
  const [errors, setErrors] = useState({});

  /* VALIDATORS */
  const validateName = name => name.split(" ").length >= 2 && name.length >= 5;
  const validateEmail = email => /\S+@\S+\.\S+/.test(email);
  const validatePhone = phone => /^\+?\d{7,15}$/.test(phone);
  const validateAddress = address => typeof address === 'string' && address.trim().split(" ").length >= 2;

  /* HANDLERS */
  const handleChange = (section, field, value) => {
    setCvData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  const handleArrayChange = (section, index, field, value) => {
    const updatedSection = [...cvData[section]];
    updatedSection[index][field] = value;
    setCvData(prev => ({ ...prev, [section]: updatedSection }));
  };
  const handleValidation = () => {
    const newErrors = {};
    const { name, email, phone, address } = cvData.personal;
    newErrors.name = !name?  'Name is required.' : !validateName(name)? "Invalid name." : "";
    newErrors.email = !email? 'Valid email is required.' : !validateEmail(email)? "Invalid email." : "";
    newErrors.phone = !phone? 'Phone number is required.' : !validatePhone(phone)? "Invalid phone number." : "";
    newErrors.address = !address? "Address is required." : !validateAddress(address)? "Invalid address." : "";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* FORM OPERATIONS */
  const addEntry = section => {
    const newEntry = section === 'education'?
    { school: '', degree: '', startMonth: '', startYear: '', endMonth: '', endYear: '' }
      :
    { company: '', title: '', startMonth: '', startYear: '', endMonth: '', endYear: '', responsibilities: '' };
    setCvData(prev => ({ ...prev, [section]: [...prev[section], newEntry] }));
  };
  const deleteEntry = (section, index) => {
    const updatedSection = cvData[section].filter((_, i) => i !== index);
    setCvData(prev => ({ ...prev, [section]: updatedSection }));
  };
  const resetForm = () => {
    setCvData({
      personal: { name: '', email: '', phone: '', address: '' },
      education: [],
      experience: [],
      skills: ''
    });
    setErrors({});
  };
  const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

  /* COMPONENT */
  return (
    <form className="form-container">
      <h2 className="section-title">Personal Information</h2>
      {['name', 'email', 'phone', 'address'].map(field => (
        <div key={field} className="form-group">
          <label className="form-label">{capitalize(field)}</label>
          <input
            className="form-input"
            type="text"
            value={cvData.personal[field]}
            onChange={e => handleChange('personal', field, e.target.value)}
          />
          {errors[field] && <p className="error-text">{errors[field]}</p>}
        </div>
      ))}
      <h2 className="section-title">Education</h2>
      {cvData.education.map((edu, index) => (
        <div key={index} className="form-group">
          {index!=0 && <hr/>}
          <div className="form-subgroup">
            <label className="form-label">School</label>
            <input
              className="form-input"
              value={edu.school}
              onChange={e => handleArrayChange('education', index, 'school', e.target.value)}
            />
          </div>
          <div className="form-subgroup">
            <label className="form-label">Degree</label>
              <input
                className="form-input"
                value={edu.degree}
                onChange={e => handleArrayChange('education', index, 'degree', e.target.value)}
              />
          </div>
          <div className="form-subgroup">
            <label className="form-label">Term</label>
            <div className="date-selectors">
              <div className="date-group start-date-group">
                <select className="form-input date-input month-input" value={edu.startMonth} onChange={e => handleArrayChange('education', index, 'startMonth', e.target.value)}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="form-input date-input year-input" value={edu.startYear} onChange={e => handleArrayChange('education', index, 'startYear', e.target.value)}>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              &nbsp;-&nbsp;
              <div className="date-group end-date-group">
                <select className="form-input date-input month-input" value={edu.endMonth} onChange={e => handleArrayChange('education', index, 'endMonth', e.target.value)}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="form-input date-input year-input" value={edu.endYear} onChange={e => handleArrayChange('education', index, 'endYear', e.target.value)}>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
          <div className="button-wrapper">
            <button type="button" className="btn btn-delete" onClick={() => deleteEntry('education', index)}>Delete</button>
          </div>
        </div>

      ))}
      <button type="button" className="btn btn-add" onClick={() => addEntry('education')}>Add Education</button>

      <h2 className="section-title">Work Experience</h2>
      {cvData.experience.map((exp, index) => (
        <div key={index} className="form-group">
          {index!=0 && <hr/>}
          <div className="form-subgroup">
            <label className="form-label">Company</label>
            <input
              className="form-input"
              value={exp.company}
              onChange={e => handleArrayChange('experience', index, 'company', e.target.value)}
            />
          </div>
          <div className="form-subgroup">
            <label className="form-label">Position</label>
            <input
              className="form-input"
              value={exp.title}
              onChange={e => handleArrayChange('experience', index, 'title', e.target.value)}
            />
          </div>
          <div className="form-subgroup">
            <label className="form-label">Term</label>
            <div className="date-selectors">
              <div className="date-group start-date-group">
                <select className="form-input date-input month-input" value={exp.startMonth} onChange={e => handleArrayChange('experience', index, 'startMonth', e.target.value)}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="form-input date-input year-input" value={exp.startYear} onChange={e => handleArrayChange('experience', index, 'startYear', e.target.value)}>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              &nbsp;-&nbsp;
              <div className="date-group end-date-group">
                <select className="form-input date-input month-input" value={exp.endMonth} onChange={e => handleArrayChange('experience', index, 'endMonth', e.target.value)}>
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="form-input date-input year-input" value={exp.endYear} onChange={e => handleArrayChange('experience', index, 'endYear', e.target.value)}>
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
          <label className="form-label">Decription</label>
          <textarea
            className="form-input"
            value={exp.responsibilities}
            onChange={e => handleArrayChange('experience', index, 'responsibilities', e.target.value)}
          />
          <div className="button-wrapper">
            <button type="button" className="btn btn-delete" onClick={() => deleteEntry('experience', index)}>Delete</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-add" onClick={() => addEntry('experience')}>Add Experience</button>
      <div className="form-group">
        <label className="form-label">Skills</label>
        <textarea
          className="form-input"
          value={cvData.skills}
          onChange={e => setCvData({ ...cvData, skills: e.target.value })}
        />
      </div>

      <div className="button-group">
        <button type="button" className="btn btn-validate" onClick={handleValidation}>Validate</button>
        <button type="button" className="btn btn-reset" onClick={resetForm}>Reset</button>
      </div>
    </form>
  );
}
