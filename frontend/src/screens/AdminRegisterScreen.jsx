import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminregisterMutation } from '../slices/adminApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';

const AdminRegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  
  const { userInfo } = useSelector((state) => state.auth);
  const [adminregister, { isLoading }] = useAdminregisterMutation();

    useEffect(() => {
      if (userInfo) {
        navigate('/admin');
      }
    }, [navigate, userInfo]);
    
 

  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log("registerscreen",userInfo);
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await adminregister({ 
                name,
                email,
                role,
                password,
                confirmPassword, }).unwrap();
        console.log("res",res)
        dispatch(setCredentials({ ...res }));
        navigate('/admin');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
      Create a admin account
      </h1>
      <Form onSubmit={SubmitHandler}>

      <Form.Group className='my-2' controlId='name'>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className='my-2' controlId='email'>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group className='my-2' controlId='mobile'>
          <Form.Control
            type='tel'
            placeholder='Mobile Number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

        

        

        <Form.Group className='my-2' controlId='password'>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Control
            type='confirPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        {isLoading && <Loader />}
        <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          <Button type='submit' variant='primary' className='mt-3'>
            Sign Up
          </Button>
        </Col>
      </Row>
      </Form>

      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
    Already have an account? <Link to={`/login`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default AdminRegisterScreen;

  





