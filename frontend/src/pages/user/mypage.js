// src/components/MyPage.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/mypage/info', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>마이페이지</h1>
      <p>이메일: {userInfo.email}</p>
      {/* 기타 사용자 정보 표시 */}
    </div>
    
  );
};

export default MyPage;