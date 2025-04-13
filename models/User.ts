import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

const Schema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.models.User || mongoose.model('User', Schema);