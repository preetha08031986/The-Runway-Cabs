// // authSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   userInfo: localStorage.getItem('userInfo')
//     ? JSON.parse(localStorage.getItem('userInfo'))
//     : null,
//   driverInfo: null,
//   vehicleInfo: null,
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       state.userInfo = action.payload;
//       localStorage.setItem('userInfo', JSON.stringify(action.payload));
//     },
//     setDriverInfo: (state, action) => {
//       state.driverInfo = action.payload;
//       localStorage.setItem('driverInfo', JSON.stringify(action.payload));
    
//     },
//     setVehicleInfo: (state, action) => {
//       state.vehicleInfo = action.payload;
//       localStorage.setItem('vehicleInfo', JSON.stringify(action.payload));

//     },
//     logout: (state, action) => {
//       state.userInfo = null;
//       state.driverInfo = null; // Clear driverInfo on logout
//       state.vehicleInfo = null; // Clear vehicleInfo on logout
//       localStorage.removeItem('userInfo');
//     },
//   },
// });

// export const { setCredentials, setDriverInfo, setVehicleInfo, logout } = authSlice.actions;

// export default authSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem("userInfo")) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        clearCredentials: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        logout: (state, action) => {
                state.userInfo = null;
                
                localStorage.removeItem('userInfo');
              },
    }
});

export const {setCredentials, clearCredentials,logout} = authSlice.actions;

export default authSlice.reducer;
