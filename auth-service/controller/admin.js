import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.js';
import User from '../models/user.js';
import Driver from '../models/driver.js'
import generateToken from '../utils/generateToken.js';
import generateOTP from '../utils/OtpGenerator.js';
import sendOtpEmail from '../utils/SendOtpEmail.js';
import mongoose from 'mongoose';


const registerAdmin = asyncHandler(async(req,res) => {
    const {name,email,password,confirmPassword} = req.body;
    console.log("request",req.body);
    const userExists =await Admin.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const admin = await Admin.create({
        name,
        email,
        role:'admin',
        password,
        confirmPassword,
    })

    if(admin){
        generateToken(res,admin._id)
        res.status(201).json({
            _id : admin._id,
            
            name : admin.name,
            
            role:'admin',
            email : admin.email,
            password : admin.password,
            confirmPassword : admin.confirmPassword,
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }
});

const loginAdmin = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    try {
        const admin = await Admin.findOne({email})

        if(admin && (await admin.matchPassword(password))){
            generateToken(res,admin._id)
            let otp=generateOTP(6,{
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log("OTP:",otp);
           
            admin.otp = otp;
            await admin.save();  
            sendOtpEmail(admin.name,admin.email,otp)
            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                role:admin.role,
                email,
                otp:admin.otp,
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
})
    const adminHomePageHandler = (req, res) => {
        console.log("home",req.body);
        
        
          // You may want to use a template engine like EJS or send a JSON response
          res.status(200).json({message:"Welcome to the Admin Home Page"});
        };

    const verifyAdminOTP=asyncHandler(async(req,res)=>{
            const {email,otp}=req.body     
            console.log("adminotp",req.body);
        
            if(!otp)
            {
                res.status(400).json({message:"OTP is required"})
            }
            const  admin=await Admin.findOne({email}).limit(1)
            if (!admin) {
                res.status(400).json({ message: "User not found with the provided email" });
                return; // Add a return statement to stop execution
              }
              console.log("adminotproute",admin)
            if(otp===admin.otp)
            {
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
                message:"OTP verification successful"})  
            }
            else
            {
            res.status(400).json({message:"OTP entered is not valid."})
            }
        })
          
        const userManagement = asyncHandler(async(req,res) =>{
           try {
            const user = await User.find({})
           
            res.status(200).json(user)
           } catch (error) {
              console.log(error);
              res.status(500).json({message:'Internal Server Error'})
            
           } 
            
           
        })
        
       const editUser = asyncHandler(async(req,res) =>{console.log("usertable");
        const { id } = req.params;
        const { name,email} = req.body;
        
        const user = await User.findById(id)
        if(user){
           user.name = name || user.name;
           user.email = email || user.email;

           const updatedUser =await user.save();
         res.status(200).json({
             _id:updatedUser._id,
             name:updatedUser.name,
             email:updatedUser.email
    })
    }else {
        res.status(404);
        throw new Error("User not found.");
    }

       });

     const deleteUser = asyncHandler(async(req,res) => {
        const { id } = req.params;
      
        const user = await User.findByIdAndDelete(id);
        console.log("iduser",user);
        if(user){
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                },
              });
            
        }else{
            res.status(404);
            throw new error("User not found.")
        }
     })  

     const driverManagement = asyncHandler(async(req,res) =>{
        try {
         const driver = await Driver.find({})
        
         res.status(200).json(driver)
        } catch (error) {
           console.log(error);
           res.status(500).json({message:'Internal Server Error'})
         
        } 
    })

    const editDriver = asyncHandler(async(req,res) =>{console.log("usertable");
        const { id } = req.params;
        const { name,email} = req.body;
        
        const driver = await Driver.findById(id)
        if(driver){
            driver.name = name || driver.name;
            driver.email = email || driver.email;

           const updatedUser =await driver.save();
         res.status(200).json({
             _id:updatedUser._id,
             name:updatedUser.name,
             email:updatedUser.email
    })
    }else {
        res.status(404);
        throw new Error("User not found.");
    }

       });

       const deleteDriver = asyncHandler(async(req,res) => {
        const { id } = req.params;
      
        const driver = await Driver.findByIdAndDelete(id);
        console.log("iduser",driver);
        if(driver){
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: {
                  _id: driver._id,
                  name: driver.name,
                  email: driver.email,
                },
              });
            
        }else{
            res.status(404);
            throw new error("User not found.")
        }
     }) 
    
     const vehicleManagement = asyncHandler(async(req,res) =>{
        try {
         const driver = await Driver.find({})
        
         res.status(200).json(driver)
        } catch (error) {
           console.log(error);
           res.status(500).json({message:'Internal Server Error'})
         
        } 
    })

    const editVehicle = asyncHandler(async(req,res) =>{console.log("usertable");
        const { id } = req.params;
        const { name,email} = req.body;
        
        const driver = await Driver.findById(id)
        if(driver){
            driver.name = name || driver.name;
            driver.email = email || driver.email;

           const updatedUser =await driver.save();
         res.status(200).json({
             _id:updatedUser._id,
             name:updatedUser.name,
             email:updatedUser.email
    })
    }else {
        res.status(404);
        throw new Error("User not found.");
    }

       });

       const deleteVehicle = asyncHandler(async(req,res) => {
        const { id } = req.params;
      
        const driver = await Driver.findByIdAndDelete(id);
        console.log("iduser",driver);
        if(driver){
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                data: {
                  _id: driver._id,
                  name: driver.name,
                  email: driver.email,
                },
              });
            
        }else{
            res.status(404);
            throw new error("User not found.")
        }
     }) 

     

  export {
    registerAdmin,
    loginAdmin,
    // logoutAdmin,
    adminHomePageHandler,
    verifyAdminOTP,
    userManagement,
    editUser,
    deleteUser,
    driverManagement,
    editDriver,
    deleteDriver,
    vehicleManagement,
    editVehicle,
    deleteVehicle

  }