import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  BrowserRouter,Routes,
  
} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import HomeScreen from './screens/UserHome.jsx';
import LoginScreen from './screens/UserLogin.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import AdminHomeScreen from './screens/AdminHome.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx';
import AdminRegisterScreen from './screens/AdminRegisterScreen.jsx';
import ProfileScreen from './screens/UserProfile.jsx'
import PrivateRoute from './components/PrivateRoute.jsx';
import DriverLoginScreen from './screens/DriverLogin.jsx';
import DriverRegisterScreen from './screens/DriverRegister.jsx';
import VehicleRegisterScreen from './screens/VehicleRegisterScreen.jsx';
import OtpAdminVerification from './screens/AdminOtp.jsx';
import OtpVerification from './screens/Otp.jsx';
import DriverOtpVerification from './screens/DriverOtp.jsx'
import AdminScreen from './screens/Admin_User.jsx'
import AdminProfileScreen from './screens/DriverProfile.jsx';
import AdminDriver from './screens/Admin_Driver.jsx';
import AdminVehicle from './screens/Admin-Vehicle.jsx'
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import About from './pages/About.jsx';
import Analytics from './pages/Analytics.jsx';
import Comment from './pages/Comment.jsx';
import Product from './pages/Product.jsx';
import ProductList from './pages/ProductList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen/>} />
      <Route path='/driverlogin' element={<DriverLoginScreen/>} />
      <Route path='/register' element={<RegisterScreen/>} />
      
      <Route path='/driverregister' element={<DriverRegisterScreen/>} />
      <Route path='/vehicleregister' element={<VehicleRegisterScreen/>} />
      <Route path='/otp' element={<OtpVerification/>} />
      <Route path='/otpadmin' element={<OtpAdminVerification/>} />
      <Route path='/driverotp' element={<DriverOtpVerification/>} />

      <Route path='/driverProfile' element={<AdminProfileScreen />} />


      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<ProfileScreen/>} />
      </Route>
      
      <Route path='/admin' element={<AdminHomeScreen />}/>
      <Route index={true} path='/admin' element={<AdminHomeScreen />} />
      <Route path="/adminlogin" element={<AdminLoginScreen/>} />
      <Route path="/adminregister" element={<AdminRegisterScreen />} />
       
       //Users UserManagement

       <Route path='/users' element={<AdminScreen />}/>
       <Route path='/driver' element={<AdminDriver />}/>
       <Route path='/vehicle' element={<AdminVehicle />}/>

       {/* <React.Fragment>
    
        <Route>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} />
          </Route>
       
          </React.Fragment> */}
   
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router} >
    <App />
    </RouterProvider>
  </React.StrictMode>
  </Provider>
)
