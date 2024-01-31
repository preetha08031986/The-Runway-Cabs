import  express  from "express";
const adminrouter = express.Router();

import {registerAdmin,loginAdmin,verifyAdminOTP,userManagement,
    editUser,deleteUser,driverManagement,editDriver,deleteDriver,adminHomePageHandler,
    vehicleManagement,editVehicle,deleteVehicle,
} from '../controller/admin.js'
 import { isAuthenticated, isAdmin} from "../middleware/authMiddleware.js";
// router.post('/admin', registerAdmin);
// adminrouter.get('/admin/homepage', adminHomePageHandler);


adminrouter.post('/adminlogin', loginAdmin);
// adminrouter.post('/logout',logoutAdmin);
adminrouter.post('/adminregister',registerAdmin);
adminrouter.post('/otpadmin',verifyAdminOTP);
adminrouter.get('/users',userManagement);
adminrouter.put('/users/:id',   editUser);
adminrouter.delete('/users/:id',  deleteUser);

adminrouter.get('/driver',driverManagement);
adminrouter.put('/driver/:id',   editDriver);
adminrouter.delete('/driver/:id',  deleteDriver);

adminrouter.get('/vehicle',vehicleManagement);
adminrouter.put('/vehicle/:id',   editVehicle);
adminrouter.delete('/vehicle/:id',  deleteVehicle);


export default adminrouter;