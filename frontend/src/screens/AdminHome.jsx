import {Container, Card, Button } from 'react-bootstrap';
import cabImage from '../images/carImage.jpeg'
// import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap'

const AdminHomeScreen = () => {
  
    // // Fetch data for the admin homepage
    // const { data: adminData, error, isLoading } = useGetAdminDataQuery();
  
    // useEffect(() => {
    //   if (error) {
    //     // Handle error, e.g., show a notification or redirect to an error page
    //     console.error('Error fetching admin data:', error);
    //   }
    // }, [error]);
   return (
    <div className='py-5'>
         <Container className='d-flex justify-content-center '>
         <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
         <h1 style={{ color: 'black', fontWeight: 'bold' }}>WELCOME ADMIN</h1>        
 
         <h1 style={{ color: 'teal', fontWeight: 'bold' }}>RuNwAy Cabs</h1>        
          <Card.Img variant='top' src={cabImage} alt='Cab' className='mb-3' style={{ width: '300px' }} />
          <p style={{ color: 'magenta', fontWeight: 'bold' }}>
          Smiles for Miles
          </p>
         
        </Card>
      </Container>
    </div>
  );
};

export default AdminHomeScreen;    
   