import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const driverAuthSchema = mongoose.Schema({
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
        default: 'driver' // Set the default value to 'driver'
    },
    otp: {
        type: String,
       
    },
    

    vehicle:[{
        Type:{
            type:String
        },
        number:{
            type:Number,
            
        },
        model:{
            type:String,
        },
        year: {
            type: Number,
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value for year'
            }
        }
    }],
   
    password: {
        type: String,
        required: true,
    },
    
},{
    timestamps: true
});

driverAuthSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
});

driverAuthSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


const Driver = mongoose.model('Driver', driverAuthSchema);

export default Driver;   