// import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import FormContainer from '../components/FormContainer.jsx';
// import  {toast}  from 'react-toastify';
// import Loader from './Loader.jsx';
// import { setCredentials } from '../slices/authSlice.js';
// import { useUpdateUserMutation } from '../slices/usersApiSlice.js';

// const ProfileScreen = () => {
  
//   const [name, setName] = useState('');
//   const [mobile,setMobile] = useState('');
//   const [currentPasswordInput, setCurrentPasswordInput] = useState('');
//   const [newPasswordInput, setNewPasswordInput] = useState('');

//   const [password, setPassword] = useState('');

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { userInfo } = useSelector((state) => state.auth);
//   console.log("userInfo<<<<",userInfo);
//   const [updateProfile, { isLoading }] = useUpdateUserMutation();
  
//   useEffect(() => {
//     setName(userInfo.name);
//     setMobile(userInfo.mobile);
//     setPassword(userInfo.password)
//     },[userInfo.name,userInfo.mobile,userInfo.password ])
//     const submitHandler = async (e) => {
//         e.preventDefault();
//         const currentPassword = currentPasswordInput.trim();
//         const newPassword = newPasswordInput.trim();
         
//           try {
//             const isCurrentPasswordCorrect = validateCurrentPassword(currentPassword);
//             if (isCurrentPasswordCorrect) {
//               // Perform the logic to change the password here
//               // dispatch(changePassword(newPassword));
//               setPasswordChanged(true); // Set the state to indicate password changed
//               toast.success('Password changed successfully');
//             } else {
//               // Show an error message if the current password is incorrect
//               toast.error('Current password is incorrect');
//             }
          
        
//             const res = await updateProfile({
//               _id: userInfo._id,
//               name,
//               mobile:userInfo.mobile,
//               currentPassword,
//               newPassword,
              
//             }).unwrap();
//             dispatch(setCredentials({ ...res }));
//             toast.success('Profile updated successfully');
//             navigate('/')
//           } catch (err) {
//             toast.error(err?.data?.message || err.error);
//           }
        
//       };

//   return (
//     <FormContainer>
//       <h1>Update Profile</h1>

//       <Form onSubmit={submitHandler}>
//         <Form.Group className='my-2' controlId='name'>
//           <Form.Control
//             type='name'
//             placeholder='Enter name'
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
        
//         <Form.Group className='my-2' controlId='mobile'>
//           <Form.Control
//             type='mobile'
//             placeholder='Enter mobile'
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           ></Form.Control>
//             </Form.Group>

//             <Form.Group className='my-2' controlId='currentPassword'>
//           <Form.Control
//             type='password'
//             placeholder='Current password'
//             value={currentPasswordInput}
//             onChange={(e) => setCurrentPasswordInput(e.target.value)}
//           ></Form.Control>
//         </Form.Group>
//         <Form.Group className='my-2' controlId='changePassword'>
//           <Form.Control
//             type='password'
//             placeholder='Change password'
//             value={newPasswordInput}
//             onChange={(e) => setNewPasswordInput(e.target.value)}
//           ></Form.Control>
//         </Form.Group>


        
//        {isLoading && <Loader/>}
//         <Button type='submit' variant='primary' className='mt-3'>
//           Update
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default ProfileScreen;


import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { setCredentials } from '../slices/authSlice';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [role,setRole] = useState('');
  const [currentPasswordInput, setCurrentPasswordInput] = useState('')
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo<<<<", userInfo);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  useEffect(() => {
    setName(userInfo.name);
    setMobile(userInfo.mobile);
    
  }, [userInfo.name, userInfo.mobile]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordInput.trim();
    const newPassword = newPasswordInput.trim();
  
    try {
      // Validate current password here
      // const isCurrentPasswordCorrect = validateCurrentPassword(currentPassword);
  
      // if (isCurrentPasswordCorrect || passwordChanged) {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          mobile,
          role,
          currentPassword,
          newPassword,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
        navigate('/');
      // } else {
      //   // Show error message if current password is incorrect
      //   toast.error('Current password is incorrect');
      // }
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  // // Function to validate the current password
  // const validateCurrentPassword = (currentPassword) => {
  //   // Implement your logic to validate the current password here
  //   // For now, return true to allow password change
  //   return currentPassword === userInfo.password; // Example: compare with stored password
  // };
  

  

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
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='mobile'>
          <Form.Control
            type='mobile'
            placeholder='Enter mobile'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='currentPassword'>
          <Form.Control
            type='password'
            placeholder='Current password'
            value={currentPasswordInput}
            onChange={(e) => setCurrentPasswordInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='changePassword'>
          <Form.Control
            type='password'
            placeholder='Change password'
            value={newPasswordInput}
            onChange={(e) => setNewPasswordInput(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}
        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
