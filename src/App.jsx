import React from 'react';
import './App.css';
import RatingPage from './RatingPage.jsx';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import SubmittedPage from './SubmittedPage.jsx';
import NoPage from './NoPage.jsx';
import Login from './frontendLecturer/Login.jsx';
import Landing from './frontendLecturer/Landing.jsx';
import Feedbackview from './frontendLecturer/Feedbackview.jsx';
import ProtectedRoute from './frontendLecturer/ProtectedRoute.jsx';
import GetQrCode from './frontendLecturer/qrCode.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

function AppRoutes() {
  let navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/eduRate/landing');
  };

  return (
    <Routes>
      <Route path='/eduRate' element={<RatingPage />} />
      <Route path='/eduRate/RatingPage' element={<RatingPage />} />
      <Route path='/eduRate/SubmittedPage' element={<SubmittedPage />} />
      <Route path='*' element={<NoPage />} />
      <Route path='/eduRate/login' element={<Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path='/eduRate/landing' element={<ProtectedRoute><Landing /></ProtectedRoute>} />
      <Route path='/eduRate/feedbackview/:lectureID' element={<ProtectedRoute><Feedbackview /></ProtectedRoute>} />
      <Route path='/eduRate/qrCode/:lectureID' element={<ProtectedRoute><GetQrCode url={'/eduRate/'} /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;