import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function Login ({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Add this line
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Replace with your API call
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store the token
        onLoginSuccess();
        navigate('/eduRate/landing');
      } else {
        alert('Ungültiger User!');
      }
    };


  return (
    <div className="login-page">
      {/* Navigation Bar */}
      <nav className="nav-bar">
      <img src={logoweiss} className='logoweiss' alt="OEHLogo" />
      </nav>
      
      {/* Login Form */}
      <div className="login-form-container">
      <p className="eduRate">eduRate</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}placeholder="Passwort" />
          </div>
          <button type="submit" id='submitButton'>Einloggen</button>
        </form>
      </div>
    </div>
  );
}


export default Login;