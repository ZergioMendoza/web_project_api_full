import { Route, Navigate } from 'react-router-dom';

const AuthRoute = ({ element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default AuthRoute;
