//utils/otpGenerator.js
import crypto from 'crypto';

const generateOTP = () => {
    let otp=crypto.randomInt(100000, 999999).toString();
    console.log("otp>>",otp)
  
  return otp
};

export default generateOTP;