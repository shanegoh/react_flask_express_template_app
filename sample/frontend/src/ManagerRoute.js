import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isStaff, isTokenExpired } from './util.js'

// isAuthenticated
function ManagerRoute({ children }) {
  if (!getAccessToken() || isTokenExpired()) {
    return <Navigate to={"/"} />;
  } else if (isStaff()) {
    return <Navigate to={"/staff"} />;
  } else return children;
}

export default ManagerRoute;