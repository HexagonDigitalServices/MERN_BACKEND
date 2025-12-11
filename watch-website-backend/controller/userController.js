import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"
import User from "../models/User.js"

const TOKEN_EXPIRES_IN = "12h"
const JWT_SECRET = process.env.JWT_SECRET

export async function register(req,res){
    try{
        const {username,email,password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false,message:"Invalid Email"})
        }
        const exists = await User.findOne({email}).lean()
        if(exists) return res.status(409).json({success:false,message:"User already exists"})
        
        const newId = new mongoose.Types.ObjectId()
        const hashedPassword = await bcrypt.hash(password,10)

        const user = new User({
            _id:newId,
            username,
            email,
            password:hashedPassword
        })

        await user.save()

        if(!JWT_SECRET) throw new Error("JWT_SECRET is not defined on the server")
        
        const token = jwt.sign({id:newId.toString()},JWT_SECRET,{expiresIn:TOKEN_EXPIRES_IN})

        return res.status(201).json({
            success:true,
            message:"Account created successfully",
            token,
            user:{id:user._id.toString(),username:user.username,email:user.email}
        })
    }catch(err){
        console.error("Register error:",err)
        return res.status(500).json({success:false,message:"Server error"})
    }
}

export async function login(req,res){
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields are required"})
        }
        const user = await User.findOne({email})
        if(!user) return res.status(401).json({success:false,message:"Invalid email"})
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) return res.status(401).json({success:false,message:"Invalid password"})

        const token = jwt.sign({id:user._id.toString()},JWT_SECRET,{expiresIn:TOKEN_EXPIRES_IN})

        return res.status(200).json({
            success:true,
            message:"Login successfull",
            token,
            user:{id:user._id.toString(),name:user.username,email:user.email}
        })
    }catch(err){
        console.log("Login error:",err)
        return res.status(500).json({success:false,message:"Server error"})
    }
}