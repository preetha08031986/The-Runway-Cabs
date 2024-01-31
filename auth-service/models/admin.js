import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const adminAuthSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'admin' // Set the default value to 'driver'
    },
   
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
       
    },
   
    
},{
    timestamps: true
});

adminAuthSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
});

adminAuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const Admin = mongoose.model('Admin', adminAuthSchema);

export default Admin;   