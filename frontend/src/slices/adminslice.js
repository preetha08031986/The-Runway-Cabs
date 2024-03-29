import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    adminInfo: localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    : null,
};

const adminauthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    adminlogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setAdminCredentials, adminlogout } = adminauthSlice.actions;

export default adminauthSlice.reducer;