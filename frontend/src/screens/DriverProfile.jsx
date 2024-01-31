import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer.jsx';
import  {toast}  from 'react-toastify';
import Loader from './Loader.jsx';
import { setCredentials } from '../slices/authSlice.js';
import { useUpdateDriverMutation } from '../slices/driversApiSlice.js';

const AdminProfileScreen = () => {
  
  const [name, setName] = useState('');
  const [mobile,setMobile] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const [updateDriver, { isLoading }] = useUpdateDriverMutation();
  
  useEffect(() => {
    setName(userInfo.name);
    setMobile(userInfo.mobile);
    setPassword(userInfo.password)
    },[userInfo.name,userInfo.mobile,userInfo.password ])
    const submitHandler = async (e) => {
        e.preventDefault();
         
          try {
            const res = await updateDriver({
              _id: userInfo._id,
              name,
              mobile,
              password,
            }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success('Profile updated successfully');
            navigate('/')
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        
      };

  return (
    <FormContainer>
      <h1>Update Profile</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        <Form.Group className='my-2' controlId='mobile'>
          <Form.Control
            type='mobile'
            placeholder='Enter mobile'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='password'>
          <Form.Control
            type='password'
            placeholder='Change password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        
       {isLoading && <Loader/>}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminProfileScreen;