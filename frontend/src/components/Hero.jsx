import React from 'react';

import {Container, Card, Button } from 'react-bootstrap';
import cabImage from '../images/carImage.jpeg'
import './Hero.css'
import { LinkContainer } from 'react-router-bootstrap'
import {  useSelector } from 'react-redux';



const Hero = () => {
  const {userInfo} = useSelector((state) => state.auth);
console.log("userInfodriver",userInfo);
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center '>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 style={{ color: 'teal', fontWeight: 'bold' }}>RuNwAy Cabs</h1>
          {/* Conditionally render welcome message if user is logged in */}
          {userInfo ? (
            <p style={{ color: 'blue', fontWeight: 'bold', fontSize: '22px' }}>Welcome, {userInfo.name}!</p>
          ) : (
            <p></p>
          )}
          <Card.Img variant='top' src={cabImage} alt='Cab' className='mb-3' style={{ width: '300px' }} />
          <p style={{ color: 'magenta', fontWeight: 'bold', fontSize: '24px' }}>
  Smiles for Miles
</p>
  
          
        </Card>
      </Container>
    </div>
  );
};

export default Hero;    
   