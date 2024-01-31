import { useState , useEffect} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
 import { useAdminloginMutation } from '../slices/adminApiSlice.js'
 import { setCredentials } from '../slices/authSlice.js';
 import {toast} from 'react-toastify'

const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 const [role,setRole]= useState('')
 const navigate = useNavigate();
 const dispatch = useDispatch();
 console.log("initial");
 const [adminlogin, {isLoading}] = useAdminloginMutation();

 const {userInfo} = useSelector((state) => state.auth);
  console.log("userInfo",userInfo);
 useEffect(() => {
  if (userInfo) {
    navigate('/adminlogin');
}
 },[]);

 
 
 const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("hello admin>>");
      const res = await adminlogin({email,password,role}).unwrap();
      // dispatch(setCredentials({...res}))
      if (res.message === 'OTP sent successfully') {
       
        console.log('OTP sent successfully');
        navigate('/otpadmin', { state: { email } });
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };


  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
        Welcome Admin
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
      </Form>

      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          New Customer? <Link to={`/adminregister`}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminLoginScreen;