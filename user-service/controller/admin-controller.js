import asyncHandler from 'express-async-handler';
import Admin from '../models/admin.js';
import generateToken from '../utils/generateToken.js';


const registerAdmin = asyncHandler(async(req,res) => {
    const {name,email,password,confirmPassword} = req.body;
    const userExists =await Admin.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error("User already exists")
    }

    const admin = await Admin.create({
        name,
        email,
        password,
        confirmPassword,
    })

    if(admin){
        generateToken(res,admin._id)
        res.status(201).json({
            _id : admin._id,
            name : admin.name,
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
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                password: admin.password
            });
        } else {
            res.status(401);
            throw new Error('Invalid Email or password');
        }
    } catch (error) {
        console.error(error); // Log any errors that occur
        res.status(500).json({ message: 'Server Error' });
    }
});

const logoutAdmin = asyncHandler(async(req,res) => {
    res.cookie('jwt', '' , {
        httpOnly: true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User Logged Out'});
    });    

  export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
  }