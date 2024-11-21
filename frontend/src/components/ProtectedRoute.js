import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  React.useEffect(() => {
      console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
