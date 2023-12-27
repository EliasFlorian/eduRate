import React from 'react';
import './Lecturer.css';
import logoweiss from '../images/logoweiss.png';

function Login () {
  return (
    <div className="login-page">
      {/* Navigation Bar */}
      <nav className="nav-bar">
      <img src={logoweiss} class='logoweiss' alt="OEHLogo" />
      </nav>
      
      {/* Login Form */}
      <div className="login-form-container">
      <p className="eduRate">eduRate</p>
        <form className="login-form">
          <div className="form-group">
            <input type="text" id="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <input type="password" id="password" placeholder="Passwort" />
          </div>
          <button type="button" id='submitButton'onClick={handleLogin}>Einloggen</button>
        </form>
      </div>
    </div>
  );
}

function handleLogin() {
    window.location.href = '/eduRate/landing';
}

export default Login;