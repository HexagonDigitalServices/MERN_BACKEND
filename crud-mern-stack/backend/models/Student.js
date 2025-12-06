const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    // age:{
    //     type:Number
    // },
    age:Number,
    course:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Student",studentSchema)