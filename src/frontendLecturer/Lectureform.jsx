import React, { useState } from 'react';
import './Lecturer.css';

function Lectureform({onFormSubmit}) {
  const [formData, setFormData] = useState({
    ort: '',
    datum: '',
    startzeit: '',
    endzeit: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic...
    console.log(formData);

    // Call the callback function after successful submission
    onFormSubmit();
};


  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="ort">Ort: </label>
        <input
          type="text"
          id="ort"
          name="ort"
          required
          value={formData.ort}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="datum">Datum: </label>
        <input
          type="date"
          id="datum"
          name="datum"
          required
          value={formData.datum}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="startzeit">Startzeit: </label>
        <input
          type="time"
          id="startzeit"
          name="startzeit"
          value={formData.startzeit}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label htmlFor="endzeit">Endzeit: </label>
        <input
          type="time"
          id="endzeit"
          name="endzeit"
          value={formData.endzeit}
          onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>Neuen Eintrag erstellen</button>
    </form>
  );
}

export default Lectureform;