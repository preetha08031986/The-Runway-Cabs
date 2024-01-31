import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userAuthSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
   mobile: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'user' // Set the default value to 'driver'
    },
    otp: {
        type: String,
        
    },
   
    password: {
        type: String,
        required: true,
    },
    
},{
    timestamps: true
});

userAuthSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
});

userAuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const User = mongoose.model('User', userAuthSchema);

export default User;   