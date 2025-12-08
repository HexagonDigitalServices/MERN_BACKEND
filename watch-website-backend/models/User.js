import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String
    }
},{timestamps})

const model = mongoose.model("User",userSchema)
export default model