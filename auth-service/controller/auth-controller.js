import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import Driver from '../models/driver.js'
import generateToken from '../utils/generateToken.js';
import generateOTP from '../utils/OtpGenerator.js';
import sendOtpEmail from '../utils/SendOtpEmail.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

//@dec  Auth user/set token
//route POST/api/users/auth
const authUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        console.log("user",user);
        if (user && (await user.matchPassword(password))) {
            generateToken(res, user._id);
            let otp=generateOTP(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
           
            user.otp = otp;
            await user.save();  
            sendOtpEmail(user.name,user.email,otp,user.mobile)
            
            res.status(200).json({
                _id: user._id,
                role:user.role,
                name: user.name,
                mobile:user.mobile,
                email:user.email,
                otp:user.otp,
                message: 'OTP sent successfully'
            });
        } else {
            res.status(401);
            throw new Error('Invalid Email or password');
        }
    } catch (error) {
        console.error(error); // Log any errors that occur
        res.status(500).json({ message: 'Server Error' });
    }
};
const forgotPassword = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            generateToken(res, user._id);
            let otp = generateOTP(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            user.otp = otp;
            await user.save();
            sendOtpEmail(user.name, user.email, otp, user.mobile);

            res.status(200).json({
                _id: user._id,
                role: user.role,
                name: user.name,
                mobile: user.mobile,
                email: user.email,
                otp: user.otp,
                message: 'OTP sent successfully'
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});





// @dec  Register a new user
//route POST/api/users

const registerUser = asyncHandler(async(req,res) => {
    const {name,email,password,mobile,confirmPassword} = req.body;
    console.log(req.body)
   const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        mobile,
        role:'user',
        password,
        confirmPassword,
    });

    if(user){
        generateToken(res,user._id)
        res.status(200).json({
            _id: user._id,
            role:user.role,
            name: user.name,
            email:user.email,
            mobile: user.mobile,
           password:user.password,
            confirmPassword:user.confirmPassword,
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data')
    }
       
        });   
   
// @dec Logout user
//route POST/api/users/logout
const logoutUser = asyncHandler(async(req,res) => {
    res.cookie('jwt', '' , {
        httpOnly: true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User Logged Out'});
    });    
    
    const getUserProfile = asyncHandler(async (req, res) => {
        console.log("profile",req.user);
        if (req.user) {
          res.json({
            _id: req.user._id,
            name: req.user.name,
            mobile:req.user.mobile,
            password:req.user.password,
            role:req.user.role,
          });
        } else {
          res.status(404);
          throw new Error('User not found');
        }
      });

      const updateUserProfile = asyncHandler(async (req, res) => {
        console.log("update>>", req.body);
        const user = await User.findById(req.body._id);
    
        if (user) {
            user.name = req.body.name || user.name;
            user.mobile = req.body.mobile || user.mobile;
            if (req.body.newPassword) {
                // Check if the current password matches the password in the database
                const isCurrentPasswordCorrect = await bcrypt.compare(req.body.currentPassword, user.password);
                if (isCurrentPasswordCorrect) {
                    // If the current password is correct, update the password with the new one
                    // const salt = await bcrypt.genSalt(10);
                    // const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
                    user.password = req.body.newPassword;
                } else {
                    res.status(400).json({ message: 'Current password is incorrect' }); // Send error message
                    return;
                }
            }
    
            const updatedUser = await user.save();
    
            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
            });
        } else {
            res.status(404).json({ message: 'User not found' }); // Send error message
        }
    });
    

      

    const registerDriver = asyncHandler(async(req,res) => {
        const {name,email,mobile,password,confirmPassword} = req.body;
        console.log("req.body",req.body);
        const user = req.body;
        console.log("user",req.body);
        const userExists =await Driver.findOne({email});
        if(userExists){
            res.status(400);
            throw new Error("User already exists")
        }
    
        const driver= await Driver.create({
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            password:user.password,
            
        })
        console.log("userExists>>>>",driver);
        if(driver){
            console.log("userExists",driver);
            generateToken(res,driver._id)
            res.status(200).json({
                _id : driver._id,
                name : driver.name,
                email : driver.email,
                role:driver.role,
                mobile:driver.mobile,
                password : driver.password,
                confirmPassword : driver.confirmPassword,
                message: 'Register Details successfully'
            })
        }else{
            res.status(400);
            throw new Error('Invalid user data')
        }
    });

    // const registerVehicle = asyncHandler(async (req, res) => {
    //     const { type, number, model, year,email } = req.body;
    //     try {
    //         const driver = await Driver.find({email});
    //         console.log("driver",driver);
    //         if (!driver) {
    //             res.status(404);
    //             throw new Error("Driver not found");
    //         }
    
    //         // Update the vehicle details
    //         driver.vehicle = {
    //             type,
    //             number,
    //             model,
    //             year,
    //         };
    
    //         // Save the changes
    //         const updatedDriver = await driver.save();
    //         res.status(200).json({
    //             //_id: updatedDriver._id,
    //             // role:updatedDriver.role,
    //             // name:updatedDriver.name,
    //             email:updatedDriver.email,
    //             type: updatedDriver.vehicle.type,
    //              number: updatedDriver.vehicle.number,
    //             model: updatedDriver.vehicle.model,
    //             year: updatedDriver.vehicle.year,
    //             message:'vehicle register successfully'
    //         });
    //     } catch (error) {
    //         console.error(error);
    //         res.status(500).json({ message: 'Server Error' });
    //     }
    // });

    const registerVehicle = asyncHandler(async (req, res) => {
        console.log("kkkkkkkkk");
        const { type, number, model, year, email ,role} = req.body;
        try {
            const driver = await Driver.findOne({ email }); // Use findOne instead of find
            console.log("driver", driver);
            if (!driver) {
                res.status(404);
                throw new Error("Driver not found");
            }
    
            // Update the vehicle details
            driver.vehicle.push({ type, number, model, year }); // Add the vehicle details to the array
    
            // Save the changes
            const updatedDriver = await driver.save();
            console.log("updatedDriver",updatedDriver)
            res.status(200).json({
                //_id: updatedDriver._id,
                role:updatedDriver.role,
                 name:updatedDriver.name,
                email: updatedDriver.email,
                type: updatedDriver.vehicle[0].type, // Access the first element of the vehicle array
                number: updatedDriver.vehicle[0].number,
                model: updatedDriver.vehicle[0].model,
                year: updatedDriver.vehicle[0].year,
                message: 'vehicle register successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    });
    

    const authDriver = async (req, res) => {
        const { email, password } = req.body;
        console.log("req.body...",req.body);
    
        try {
            const driver = await Driver.findOne({ email });
            console.log("driver", driver); // Log user to see if it's found
    
            if (driver && (await driver.matchPassword(password))) {
                generateToken(res, driver._id);
                let otp=generateOTP(6,{
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                console.log("OTP:",otp);
               
                driver.otp = otp;
                await driver.save();  
                sendOtpEmail(driver.name,driver.email,otp)
                res.status(200).json({
                    _id: driver._id,
                    name: driver.name,
                    role:driver.role,
                    email:driver.email,
                    otp:driver.otp,
                    password,
                    message: 'OTP sent successfully',
                });
            } else {
                res.status(401);
                throw new Error('Invalid Email or password');
            }
        } catch (error) {
            console.error(error); // Log any errors that occur
            res.status(500).json({ message: 'Server Error' });
        }
    };

    const otpDriver=asyncHandler(async(req,res)=>{
        const {email,otp}=req.body     
        console.log("adminotp",req.body);
    
        if(!otp)
        {
            res.status(400).json({message:"OTP is required"})
        }
        const  driver=await Driver.findOne({email}).limit(1)
        // const admin = await Admin.findOne({email}).limit(1)
        if (!driver) {
            res.status(400).json({ message: "User not found with the provided email" });
            return; // Add a return statement to stop execution
          }
          console.log("driver",driver)
        if(otp===driver.otp)
        {
        res.status(201).json({
            _id: driver._id,
            name: driver.name,
            email: driver.email,
            role: driver.role,
            message:"OTP verification successful"})  
        }
        else
        {
        res.status(400).json({message:"OTP entered is not valid."})
        }
    })

    //verifyOTP
const verifyOTP=asyncHandler(async(req,res)=>{
    const {email,otp}=req.body     
    console.log("adminotp",req.body);

    if(!otp)
    {
        res.status(400).json({message:"OTP is required"})
    }
    const  user=await User.findOne({email}).limit(1)
    // const admin = await Admin.findOne({email}).limit(1)
    if (!user) {
        res.status(400).json({ message: "User not found with the provided email" });
        return; // Add a return statement to stop execution
      }
      console.log(user)
    if(otp===user.otp)
    {
    res.status(201).json({
        _id: user._id,
        name: user.name,
        mobile:user.mobile,
        email: user.email,
        password:user.password,
        role: user.role,
        message:"OTP verification successful"})  
    }
    else
    {
    res.status(400).json({message:"OTP entered is not valid."})
    }
})

const getDriverProfile = asyncHandler(async (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.json({
        _id: req.user._id,
        name: req.user.name,
        // email: req.user.email,
        mobile:req.user.mobile,
        password:req.user.password,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  const updateDriverProfile = asyncHandler(async (req, res) => {
    console.log("update>>",req.body);
    const admin = await Admin.findById(req.body._id);
  
    if (admin) {
        admin.name = req.body.name || admin.name;
    //   user.email = req.body.email || user.email;
    admin.mobile = req.body.mobile || admin.mobile;
      if (req.body.password) {
        admin.password = req.body.password;
      }
  
      const updatedUser = await admin.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        mobile:updatedUser.mobile,
        password:updatedUser.password,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
   
  const logoutDriver = asyncHandler(async(req,res) => {
    res.cookie('jwt', '' , {
        httpOnly: true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User Logged Out'});
    });    


export {
    authUser,
    forgotPassword,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    
    registerDriver,
    registerVehicle,
    authDriver,
    otpDriver,
    verifyOTP,
    getDriverProfile,
    updateDriverProfile,
    logoutDriver,

};    