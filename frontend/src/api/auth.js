import axios from './axiosConfig';

// 로그인한 유저의 토큰이 유효한지 검증하는 로직
export const validateToken = async (token) => {
  try {
    const response = await axios.post('/api/auth/validate', null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      const user = response.data.user;
      return { isValid: true, user };
    }
    return { isValid: false, user: null };
  } catch (error) {
    console.error('Token validation error:', error);
    return await reissueToken(token);
  }
};

const reissueToken = async (expiredToken) => {
  try {
    const response = await axios.post('/api/auth/reissue', null, {
      headers: {
        'Authorization': `Bearer ${expiredToken}`
      },
      withCredentials: true // 쿠키 전송을 위해 필요
    });

    if (response.status === 200) {
      const newAccessToken = response.headers['authorization'].split(' ')[1];
      localStorage.setItem('accessToken', newAccessToken);
      return { isValid: true, user: response.data.user };
    } else {
      return { isValid: false, user: null };
    }
  } catch (error) {
    console.error('Token reissue error:', error);
    return { isValid: false, user: null };
  }
};
