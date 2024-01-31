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
   
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 'admin',
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


const Admin = mongoose.model('Admin', userAuthSchema);

export default Admin;   