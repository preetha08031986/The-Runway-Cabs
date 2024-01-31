import { apiSlice } from './apiSlice';
const USERS_URL = '/api/driver';

export const driverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    driverlogin: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/driverlogin`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
        query: () => ({
          url: `${USERS_URL}/logout`,
          method: 'POST',
        }),
      }),
      driverregister: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/driverregister`,
          method: 'POST',
          body: data,
        }),
       }),
       updateDriver: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/driverProfile`,
          method: 'PUT',
          body: data,
        }),
      }), 

      
      
      vehicleregister:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/vehicleregister`,
          method: 'POST',
          body: data,
        }),
      }), 

      driverotp:builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/driverotp`,
          method: 'POST',
          body: data,
        }),
      })

    
       
  }),
});

export const {  useLogoutMutation,useVehicleregisterMutation,useDriverloginMutation,useDriverregisterMutation,useUpdateDriverMutation,useDriverotpMutation} =
driverApiSlice; 
  // export const {adminLoginMutation} = adminApiSlice;