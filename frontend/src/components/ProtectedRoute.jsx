import { jwtDecode } from 'jwt-decode'; // Corrected import
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, component: Component }) => {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  const decoded = jwtDecode(token); // Use jwtDecode here
  if (decoded.role !== role) return <Navigate to="/" />;

  return <Component />;
};

export default ProtectedRoute;
