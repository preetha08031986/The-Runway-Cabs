import  jwt  from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import User from '../models/user.js'

const protect =asyncHandler(async (req, res, next) => {
    let token;
    console.log("token>>",req.cookies.jwt);
    token = req.cookies.jwt;

    if (token){
        try{
          const decoded =  jwt.verify(token, process.env.JWT_SECRET);
          req.user = await User.findById(decoded.userId).select('-password')
          next();

        } catch (error) {
            // Use the `next` function to pass the error to the error-handling middleware
            return next({ status: 401, message: 'Not authorized, invalid token' });
          }
        } else {
          // Use the `next` function to pass the error to the error-handling middleware
          return next({ status: 401, message: 'Not authorized, no token' });
        }
})
const isAuthenticated = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
      try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          req.user = await User.findById(decoded.userId).select('-password');
          next();
      } catch (error) {
          res.status(401);
          throw new Error("not authorized, invalid token");
      }
  } else {
      res.status(401);
      throw new Error("not authorized, no token");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.isAdmin) {
      next();
  } else {
      res.status(401);
      throw new Error("not authorized, no privillege");
  }
});

export { protect ,isAuthenticated,isAdmin}