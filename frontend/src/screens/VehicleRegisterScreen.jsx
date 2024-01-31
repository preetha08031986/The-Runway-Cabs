import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useVehicleregisterMutation } from '../slices/driversApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from './Loader';
import { toast } from 'react-toastify';

const VehicleRegisterScreen = () => {
  const [type, setType] = useState('');
  const [number, setNumber] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  // const [email,setEmail] = useState('');
  // const [name,setName] = useState('');
  const { state } = useLocation();
  const email = state?.email || '';
  const role= state?.role|| '';

console.log("email",email);
console.log("role",role);
  

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //  const { setDriverInfo } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.auth);

  const [vehicleregister, { isLoading }] = useVehicleregisterMutation();
  console.log("vehicleinfrontend",userInfo);
  useEffect(() => {
    
  }, []);
  
 

  
  
    const submitHandler = async (e) => {
      e.preventDefault();
      

      try {
        console.log("hello>>>");
        const res = await vehicleregister({
          email: email,
          name,
          role:role,
          type,
          number,
          model,
          year,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("res",res);
        if (res.message === 'vehicle register successfully') {
          navigate('/'); // Only navigate if registration is successful
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    
  
  
  

  return (
    <FormContainer>
      <h1 className='text-center mb-4' style={{ color: 'teal' }}>
       Enter Vehicle Details
      </h1>
      <Form onSubmit={submitHandler}>

      <Form.Group className='my-2' controlId='type'>
          <Form.Control
            type='text'
            placeholder='Vehicle Type'
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className='my-2' controlId='number'>
          <Form.Control
            type='text'
            placeholder='Vehicle Registration Number'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='model'>
          <Form.Control
            type='text'
            placeholder='Make and Model'
            value={model}
            onChange={(e) => setModel(e.target.value)}
          ></Form.Control>
        </Form.Group>

        

        <Form.Group className='my-2' controlId='year'>
          <Form.Control
            type='number'
            placeholder='Year of Manufacture'
            value={year}
            onChange={(e) => setYear(e.target.value)}
          ></Form.Control>
        </Form.Group>

        
        <p style={{ color: 'Indigo', fontWeight: 'bold' }}>
        By signing up, you agree to our Terms , Privacy Policy and Cookies Policy.
          </p>
        
        {isLoading && <Loader />}
        <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          <Button type='submit' variant='primary' className='mt-3'>
            Sign Up
          </Button>
        </Col>
      </Row>
      </Form>

      
    </FormContainer>
  );
};

export default VehicleRegisterScreen;

  





