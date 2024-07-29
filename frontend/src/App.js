// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Login from './pages/user/login';
import Signup from './pages/user/signup';
import Home from './pages/home';

import PrivateRoute from './component/privateRoute';
import { clearUser, initializeUser } from './store/authSlice';
import MyPage from './pages/user/mypage';
import axios from 'axios';
import { validateToken } from './api/auth';


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      console.log("로컬 토큰 :  " + token);
      if (token) {
        const { isValid, user } = await validateToken(token);
        if (isValid) {
          dispatch(initializeUser({ user, token }));
        } else {
          dispatch(clearUser());
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route 
            path='/api/mypage/info' 
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }/>
          {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        </Routes>
      </Router>
  );
}

export default App;
