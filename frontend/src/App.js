// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Login from './pages/user/login';
import Signup from './pages/user/signup';
import Home from './pages/home';

import PrivateRoute from './component/privateRoute';
import { initializeUser } from './store/authSlice';
import MyPage from './pages/user/mypage';
import axios from 'axios';


function App() {

  const dispatch = useDispatch();

  // 새로고침 했을 때 로컬스토리지에 있는 accessToken으로 유저를 세팅해주기위해
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // 그럼 이게 mypage가 아니라 유저정보를 가져올 수 있는 걸 새로 만들어야한다. 컨트롤러에
      axios.get('/api/auth/userinfo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then(response => {
        dispatch(initializeUser({ user: response.data.user, token }));
      }).catch(error => {
        console.error('Failed to fetch user info on load:', error);
      });
    }
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
