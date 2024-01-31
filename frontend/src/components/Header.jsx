import React, { useState,useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';

import { logout } from '../slices/authSlice';
import Logo from './Logo.jsx';
// import jwt from 'jsonwebtoken';
  
// const decodeToken = (token) => {
//   try {
//     // Decode the token
    
//      const decoded = jwt.verify(token, process.env.JWT_SECRET); 

//     return decoded;
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     return null;
//   }
// };
const UserHeader =( {userInfo,logoutHandler}) => (
  <>
  <NavDropdown title={userInfo.name} id='username'>
    <LinkContainer to='/profile'>
      <NavDropdown.Item>Profile</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
  </NavDropdown>
  </>
);
const DriverHeader =( {userInfo,logoutHandler}) => (
  <>
  <NavDropdown title={userInfo.name} id='username'>
    <LinkContainer to='/profile'>
      <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
  </NavDropdown>
  </>
);
const AdminHeader = ({ userInfo, logoutHandler }) => (
  
  <>
    <LinkContainer to='/admin-dashboard'>
      <Nav.Link><FaSignInAlt />Admin Dashboard</Nav.Link>
    </LinkContainer>

    <LinkContainer to='/users'>
      <Nav.Link><FaSignInAlt />User</Nav.Link>
    </LinkContainer>

    <LinkContainer to='/driver'>
      <Nav.Link><FaSignInAlt />Driver</Nav.Link>
    </LinkContainer>

    <LinkContainer to='/vehicle'>
      <Nav.Link><FaSignInAlt />Vehicle</Nav.Link>
    </LinkContainer>

    <NavDropdown title={userInfo.name} id='username'>
      <LinkContainer to='/profile'>
        <NavDropdown.Item>Profile</NavDropdown.Item>
      </LinkContainer>
      <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    </NavDropdown>
  </>
);




const DefaultHeader = ({ showUser, showDriver, onUserClick, onDriverClick ,userInfo}) => (
  <>
          {console.log("useradmin", userInfo)}

    {showUser && (
      
      <LinkContainer to='/login'>
        <Nav.Link onClick={onUserClick}>
          <FaSignInAlt /> User
        </Nav.Link>
      </LinkContainer>
    )}
    {showDriver && (
      <LinkContainer to='/driverlogin'>
        <Nav.Link onClick={onDriverClick}>
          <FaSignOutAlt /> Driver
        </Nav.Link>
      </LinkContainer>
    )}
      {userInfo?.role === 'admin' && ( 
      <>
        <LinkContainer to='/adminlogin'>
          <Nav.Link>
            <FaSignInAlt /> Sign In
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to='/adminregister'>
          <Nav.Link>
            <FaSignOutAlt /> Sign Up
          </Nav.Link>
        </LinkContainer>
      </>
    )}
  </>
);

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  {console.log("useradmin", userInfo)}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall] = useLogoutMutation();
  

  useEffect(() => {
    // Reset button click state when the location changes
    setIsUserClicked(false);
    setIsDriverClicked(false);
  }, [location.pathname]);

  

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };


  // const driverlogoutHandler = async () => {
  //   try {
  //     await driverlogoutApiCall().unwrap();
  //     dispatch(logout());
  //     navigate('/driverlogin');
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const [isUserClicked, setIsUserClicked] = useState(false);
  const [isDriverClicked, setIsDriverClicked] = useState(false);

  const handleUserClick = () => {
    setIsUserClicked(true);
    setIsDriverClicked(false);
    // Add any other logic you want to perform on user button click
  };

  const handleDriverClick = () => {
    setIsDriverClicked(true);
    setIsUserClicked(false);
    // Add any other logic you want to perform on driver button click
  };
  // useEffect(() => {
  //   if (userInfo && userInfo.token) {
  //     const decodedToken = decodeToken(userInfo.token);
  //     console.log('Decoded token:', decodedToken);
  //     // You can access decoded token properties here and perform any necessary logic
  //   }
  // }, [userInfo]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><Logo/>Runway</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  {userInfo.role === 'user' && (
                    <UserHeader userInfo={userInfo} logoutHandler={logoutHandler} />
                  )}

                  {userInfo.role === 'driver' && (
                    <DriverHeader userInfo={userInfo} logoutHandler={logoutHandler} />
                  )}

                  {userInfo.role === 'admin' && isAdminRoute && (
                    <AdminHeader userInfo={userInfo} logoutHandler={logoutHandler} />
                  )}
                </>
              ) : (
                <>
                  {isAdminRoute ? (
                    <>
                      <LinkContainer to='/adminlogin'>
                        <Nav.Link>
                          <FaSignInAlt /> Sign In
                        </Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/adminregister'>
                        <Nav.Link>
                          <FaSignOutAlt /> Sign Up
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  ) : (
                    <DefaultHeader
                      showUser={!isDriverClicked}
                      showDriver={!isUserClicked}
                      onUserClick={handleUserClick}
                      onDriverClick={handleDriverClick}
                      userInfo={userInfo}  
                    />
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;