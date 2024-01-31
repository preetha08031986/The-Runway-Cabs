import { useState , useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.jsx';
import { useDriverloginMutation } from '../slices/driversApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import {toast} from 'react-toastify'
import Loader from './Loader.jsx';

const clientId =  "207196162638-bv95h3ff5aljtr108frreg73f8ttee9q.apps.googleusercontent.com"
const DriverLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

 const navigate = useNavigate();
 const dispatch = useDispatch();
 
 const [driverlogin, {isLoading}] = useDriverloginMutation();

 const {userInfo} = useSelector((state) => state.auth);
  
 useEffect(() => {
  if (userInfo) {
    navigate('/driverlogin');
}
 },[]);
 


 const submitHandler = async (e) => {

    e.preventDefault();
    try {
  
      
      const res = await driverlogin({email,password}).unwrap();
      //  dispatch(setCredentials({...res}))
console.log("res>>>>",res);
      
      if (res.message === 'OTP sent successfully') {
       
        console.log('OTP sent successfully');
        navigate('/driverotp', { state: { email } });
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
        Welcome Our Partner
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
         
         {isLoading && <Loader />}

        <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          <Button type='submit' variant='primary' className='mt-3'>
           Send OTP
          </Button>
        </Col>
      </Row>
      </Form>
      
      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          New Customer? <Link to={`/driverregister`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default DriverLoginScreen;