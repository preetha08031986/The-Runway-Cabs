// import { createSlice } from '@reduxjs/toolkit';

// export const otpSlice = createSlice({
//   name: 'otp',
//   initialState: {
//     otp: null,
//     isVerified: false,
//   },
//   reducers: {
//     setOtp: (state, action) => {
//       state.otp = action.payload;
//     },
//     verifyOtp: (state) => {
//       state.isVerified = true;
//     },
//   },
// });

// export const { setOtp, verifyOtp } = otpSlice.actions;

// export const submitOtp = (enteredOtp) => (dispatch, getState) => {
//   const { otp } = getState().otp;

//   if (enteredOtp === otp) {
//     dispatch(verifyOtp());
//     // Dispatch additional actions or perform other logic as needed
//   } else {
//     // Handle incorrect OTP
//     console.log('Incorrect OTP');
//   }
// };

// export default otpSlice.reducer;
