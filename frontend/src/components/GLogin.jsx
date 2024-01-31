// import React from 'react';
// import { GoogleLogin } from 'react-google-login';
// const clientId = '207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com'


// function LoginButton() {

//     const onSuccess = (res) => {
//         console.log("Login Success! Current user:", res.profileObj);
//     }

//     const onFailure = (res) => {
//         console.log("Login Failed! res: ", res);
//     }
//     return(
//         <div id='signInButton'>
//         <GoogleLogin
//         clientId="207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com"
//         buttonText="Sign in with Google"
//         onSuccess={onSuccess}
//         onFailure={onFailure}
//         cookiePolicy={'single_host_origin'}
//         isSignedIn={true}
//       /> 
//       </div>
//     )
// }

// export default LoginButton


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';
import Loader from '../screens/Loader.jsx';
import { gapi } from 'gapi-script';

const clientId =  "207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com"

const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: 'email',
        plugin_name:'RunwayCabs',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const OnSignIn = async (googleUser) => {
    try {
      // Extract necessary user information from googleUser
      const profile = googleUser.getBasicProfile();

      // Dispatch the user information to Redux store
      dispatch(setCredentials({
        name: profile.getName(),
        email: profile.getEmail(),
        // Add any other relevant user information
      }));

      // Redirect to the desired route
      navigate('/');

    } catch (error) {
      toast.error('Google Sign-In Failed.');
      console.error(error);
    }
  };

  const OnSignInFailure = (error) => {
    console.error('Google Sign-In Failure:', error);
  };

  return (
    <>
      <div className="g-signin2" data-onsuccess="OnSignIn" data-onfailure="OnSignInFailure"></div>
      {<Loader />}
    </>
  );
};

export default GoogleSignInButton;
