import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

    const isAuthenticated = localStorage.getItem('token'); // Check if token exists
    return isAuthenticated ? children : <Navigate to="/eduRate/landing" />;
  };
  

export default ProtectedRoute;