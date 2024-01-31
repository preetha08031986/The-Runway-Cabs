import React, { useState, useEffect } from 'react';
import { Form, Button,Row,Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {useVerifyadminOtpMutation} from '../slices/adminApiSlice.js'
import { setCredentials } from '../slices/authSlice.js';
import Loader from './Loader.jsx';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpAdminVerification = () => {
  const { state } = useLocation();
  const email = state?.email || '';
 
console.log("state",state);
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyadminOtp, { isLoading }] = useVerifyadminOtpMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
  }, []);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    try {
      
      // Verify OTP   
      const res = await verifyadminOtp({ email: email, otp }).unwrap();
      console.log('Verification response:', res);

      if (res.message === 'OTP verification successful') {
        dispatch(setCredentials({ ...res }));
        
        navigate('/admin');
     
        console.log('OTP verification successful. Redirecting to the landing page.');
      } else {
        console.error('OTP verification failed:', res.message);
        console.error('Error details:', error.response); 
        // Handle other cases if needed
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <FormContainer>
        <h1 className='text-center mb-4' style={{ color: 'teal' }}>Enter OTP:</h1>

        <Form onSubmit={handleVerifyOTP}>
          <Form.Group className='my-2' controlId='password'>
            <Form.Control
              type='text'
              placeholder='Enter OTP'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>

          <Row className='py-3 d-flex justify-content-center'>
        <Col xs={12} md={6} className='text-center'>
          <Button type='submit' variant='primary' className='mt-3'>
           Verify OTP
          </Button>
        </Col>
      </Row>
        </Form>

        {isLoading && <Loader />}

        {/* Additional UI elements if needed */}
      </FormContainer>
    </div>
  );
};

export default OtpAdminVerification;
