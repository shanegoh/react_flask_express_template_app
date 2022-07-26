import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, isManager, isTokenExpired } from './util.js'

function StaffRoute({ children }) {
  if (!getAccessToken() || isTokenExpired()) {
    return <Navigate to={"/"} />;
  } else if (isManager()) {
    return <Navigate to={"/manager"} />;
  } else return children;
}

export default StaffRoute;