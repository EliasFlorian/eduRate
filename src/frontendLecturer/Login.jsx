import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from './NavBar';
import { UserProvider } from './UseUser';
import { useUser } from './UseUser';

function Login ({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Add this line
    const { setAccessToken } = useUser();
    const { user } = useUser();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if(user.name) {
        alert('You are already logged in! Log out first!');
        return;
      }
  
      // Replace with your API call
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        //localStorage.setItem('token', data.token); // Store the token
        setAccessToken(data.token);
        onLoginSuccess();
        //navigate('/eduRate/landing');
      } else {
        alert('Ungültiger User!');
      }
    };


  return (
    <div className="login-page">
      {/* Navigation Bar */}
      <NavBar />
      
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