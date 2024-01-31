import { apiSlice } from './apiSlice';
const USERS_URL = '/api/admin';

export const userApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
      adminlogin: builder.mutation({
        query: (data) => ({
          url: `${USERS_URL}/adminlogin`,
          method: 'POST',
          body: data,
        }),
        onError: (error) => {
            console.error('adminlogin error:', error);
            // Handle the error, e.g., show a notification or redirect to an error page.
          },
      }),
      adminlogout: builder.mutation({
          query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',
          }),
        }),
        adminregister: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/adminregister`,
            method: 'POST',
            body: data,
          }),
         }),
         updateadmin: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/adminProfile`,
            method: 'PUT',
            body: data,
          }),
        }), 
        verifyadminOtp: builder.mutation({
          query: (data) => ({
            url: `${USERS_URL}/otpadmin`,
            method: 'POST',
            body: data,
          }),
         }),

         usermanagement: builder.query({
          query: () => ({
            url: `${USERS_URL}/users`,
            method: 'GET',
            
          }),
         }),
       
         deleteuser: builder.mutation({
          query: (id) => ({
            url: `${USERS_URL}/users/${id}`,
            method: 'DELETE',
           
          }),
         }),

         edituser: builder.mutation({
          query: ({id,data}) => ({
            url: `${USERS_URL}/users/${id}`,
            method: 'PUT',
            body: data,
          }),
         }),

         drivermanagement: builder.query({
          query: () => ({
            url: `${USERS_URL}/driver`,
            method: 'GET',
            
          }),
         }),

         deletedriver: builder.mutation({
          query: (id) => ({
            url: `${USERS_URL}/driver/${id}`,
            method: 'DELETE',
           
          }),
         }),

         editdriver: builder.mutation({
          query: ({id,data}) => ({
            url: `${USERS_URL}/driver/${id}`,
            method: 'PUT',
            body: data,
          }),
         }),

         vehiclemanagement: builder.query({
          query: () => ({
            url: `${USERS_URL}/vehicle`,
            method: 'GET',
            
          }),
         }),

         deletevehicle: builder.mutation({
          query: (id) => ({
            url: `${USERS_URL}/vehicle/${id}`,
            method: 'DELETE',
           
          }),
         }),

         editvehicle: builder.mutation({
          query: ({id,data}) => ({
            url: `${USERS_URL}/vehicle/${id}`,
            method: 'PUT',
            body: data,
          }),
         }),


    }),
})
        export const { useAdminloginMutation,useAdminlogoutMutation,useAdminregisterMutation,useUpdateadminMutation,
        useVerifyadminOtpMutation,
        useUsermanagementQuery,
      useDeleteuserMutation,
    useEdituserMutation,
  useDrivermanagementQuery,
useEditdriverMutation,
useDeletedriverMutation,
useDeletevehicleMutation,
useEditvehicleMutation,
useVehiclemanagementQuery} =
  userApiSlice; 