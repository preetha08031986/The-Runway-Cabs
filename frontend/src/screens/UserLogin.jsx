import React ,{ useState , useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.jsx';
 import { useLoginMutation ,useForgotPasswordMutation} from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import {toast} from 'react-toastify'
import Loader from './Loader.jsx';
// import GoogleSignInButton from '../components/GLogin.jsx'
// import LogoutButton from '../components/GLogout.jsx'
// import { gapi } from 'gapi-script'

// const clientId =  "207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com"
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();
 const dispatch = useDispatch();
 
 const [login, {isLoading:loginIsLoading}] = useLoginMutation();
 const [forgotPassword, {isLoading:forgotPasswordIsLoading}] = useForgotPasswordMutation();


 const {userInfo} = useSelector((state) => state.auth);
  
 useEffect(() => {
  if (userInfo) {
    navigate('/login');
}
 },[]);
 
//  useEffect(() =>{
//     function start() {
//       gapi.client.init({
//         clientId: clientId,
//         scope:"openid profile email"
//       })
//     };
//     gapi.load('client:auth',start)
//  })
const submitHandler = async (e) => {
  e.preventDefault();
  // Check if email and password are not empty
  if (!email.trim() || !password.trim()) {
    toast.error('Please enter email and password');
    return;
  }

  try {
    const res = await login({ email, password, role }).unwrap();
    console.log("resauth", res);
    if (res.message === 'OTP sent successfully') {
      console.log('OTP sent successfully');
      navigate('/otp', { state: { email } });
    }
  } catch (error) {
    console.error('Login error:', error);
    
    toast.error('Invalid email or password');
  }
};

const handleForgotPasswordClick =async (e) => {
  try {
    const res = await forgotPassword({email}).unwrap()
    if(res.message=== 'OTP sent successfully'){
      console.log('OTP sent successfully');
      navigate('/otp', { state: { email } });
    }
  } catch (error) {
    
  }
  navigate('/reGeneratePassword');
};


  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
        Welcome to RuNwAy
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
         
         

        <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          <Button type='submit' variant='primary' className='mt-3'>
            Send OTP
          </Button>
        </Col>
      </Row>

      

      <Row className='py-1 d-flex justify-content-center'>
  <Col xs={12} md={8} className='text-right mb-1'>
    <Button
      variant='primary'
      className='mt-2'
      style={{ backgroundColor: 'ivory', color: 'black' }}
      onClick={handleForgotPasswordClick}
    >
      Forgot Password?
    </Button>
  </Col>
</Row>





      </Form>

      
      <Row className='py-3 d-flex justify-content-center'>
    <Col  className='text-center'>
      <p style={{ color: 'Black' }}>
        or
      </p>
    </Col>
  </Row>

  {/* <Row className='py-3 d-flex justify-content-center'>
    <Col xs={12} md={6} className='text-center'>
      <div className="py-3 d-flex justify-content-center">
        <GoogleSignInButton/>
      </div>
    </Col>
  </Row> */}

      

      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          New Customer? <Link to={`/register`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;