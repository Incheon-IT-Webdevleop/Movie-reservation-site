import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.token); // 토큰 저장
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken'); // 토큰 삭제
    },
    initializeUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
    },
    updateToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('accessToken', action.payload.token); // 토큰 저장
    },
  }
});

export const { setUser, clearUser, updateToken, initializeUser } = authSlice.actions;
export default authSlice.reducer;
