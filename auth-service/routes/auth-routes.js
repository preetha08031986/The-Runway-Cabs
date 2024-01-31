import  express  from "express";
const router = express.Router();
import {authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    forgotPassword,
  verifyOTP,} from '../controller/auth-controller.js'
 import {isAuthenticated } from "../middleware/authMiddleware.js";
//  router.get('/admin', adminHomePageHandler);
router.post('/register', registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.post('/forgot-password',forgotPassword)
 router.post('/otp',verifyOTP);
// router.post('/driverlogin',authDriver);


router
  .route('/profile')
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUserProfile);


export default router;