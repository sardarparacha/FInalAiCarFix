import { createSlice } from '@reduxjs/toolkit';

const userInfoFromStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userInfo')) : null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfoFromStorage,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    clearCredentials: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
