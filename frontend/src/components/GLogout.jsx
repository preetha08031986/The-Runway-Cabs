import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = "207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com";

function LogoutButton() {
  const onSuccess = () => {
    console.log("Log out successful!");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default LogoutButton ;
