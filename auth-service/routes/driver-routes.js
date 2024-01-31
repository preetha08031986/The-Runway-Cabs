import  express  from "express";
// const driverrouter = express.Router();
const driverrouter = express.Router();
import {
    authDriver,
    logoutUser,
    
    registerDriver,
    registerVehicle,
    getDriverProfile,
    updateDriverProfile,
    logoutDriver,
    otpDriver} from '../controller/auth-controller.js'
 import { protect,isAuthenticated } from "../middleware/authMiddleware.js";

 driverrouter.post('/driverlogin',authDriver);
 driverrouter.post('/driverregister',registerDriver);
 driverrouter.post('/vehicleregister',registerVehicle);
 driverrouter.post('/driverlogout',logoutDriver);
 driverrouter.post('/driverotp',otpDriver);

 driverrouter
  .route('/driverProfile')
  .get(isAuthenticated, getDriverProfile)
  .put(isAuthenticated, updateDriverProfile);
//  driverrouter.post('/otp',verifyOTP);

    

export default driverrouter