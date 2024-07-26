import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { validateToken } from '../api/auth';
import { clearUser } from '../store/authSlice';

const PrivateRoute = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const isValid = await validateToken(token);
        setIsValidToken(isValid);
        if (!isValid) {
          dispatch(clearUser());
        }
      } else {
        setIsValidToken(false);
      }
    };

    checkToken();
  }, [token, dispatch]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  if (!isValidToken) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
