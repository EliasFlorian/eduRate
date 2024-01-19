import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewUser() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
      });
      
      const handleChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
      };
      const navigate = useNavigate();

      const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle form submission logic...
        console.log(formData);
    
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ username: formData.username,
            password: formData.password }),
        });
        if (response.ok) {
            navigate('/edurate/landingadmin'); }
    };
    
    
      return (
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>
    
          <div className='form-group'>
            <label htmlFor="password">Passwort: </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleSubmit}>Neuen User erstellen</button>
        </form>
      );
    }


export default NewUser