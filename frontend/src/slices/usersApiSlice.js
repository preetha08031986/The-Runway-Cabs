import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
      }),
    }),

    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      register: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/register`,
          method: 'POST',
          body: data,
        }),
       }),
       updateProfile: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/Profile`,
          method: 'PUT',
          body: data,
        }),
      }), 

      

      verifyOTP:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/otp`,
          method: 'POST',
          body: data,
        }),
      })

       
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation ,useUpdateProfileMutation,useVerifyOTPMutation,useForgotPasswordMutation} =
  userApiSlice; 
  // export const {adminLoginMutation} = adminApiSlice;