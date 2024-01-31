import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useDriverregisterMutation } from '../slices/driversApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { ArrowRightCircle } from 'react-bootstrap-icons';

const DriverRegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [role,setRole] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  
  const { userInfo } = useSelector((state) => state.auth);
  const [driverregister, { isLoading }] = useDriverregisterMutation();
  
  useEffect(() => {
    if (userInfo) {
      navigate('/vehicleregister');
    }
  }, [navigate, userInfo]);
  
 

  const handleRedirect = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await driverregister({ 
                name,
                email,
                mobile,
                role,
                password,
                 }).unwrap();
        console.log(res)
        //  dispatch(setCredentials({ ...res }));
        console.log("resdriver",res);
        if (res.message === 'Register Details successfully') {
       
          console.log('OTP sent successfully');
          navigate('/vehicleregister',{state:{email,role}});        }
       
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
        Register your Details
      </h1>
      <Form onSubmit={handleRedirect}>

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

        <Form.Group className='my-2' controlId='mobile'>
          <Form.Control
            type='tel'
            placeholder='Mobile Number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Control
            type='confirPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        {isLoading && <Loader />}
        <Container>
      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          {/* Instead of the Sign Up button, use the ArrowRightCircle icon */}
          <Button variant='primary' className='mt-3' onClick={handleRedirect}>
            <ArrowRightCircle size={30} style={{ marginRight: '8px' }} />
            Go to Next Page
          </Button>
        </Col>
      </Row>
    </Container>
      </Form>

      <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
    Already have an account? <Link to={`/driverlogin`}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default DriverRegisterScreen;

  





