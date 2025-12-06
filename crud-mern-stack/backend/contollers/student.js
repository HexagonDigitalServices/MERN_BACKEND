const Student = require('../models/Student')

const getStudents = async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({message:"something went wrong"})
    }
}

const createStudent = async (req,res)=>{
    try {
        const {name,age,course} = req.body
        if(!name || !age || !course){
            return res.status(400).json({error:"All fields are required"})
        }
        const student = await Student.create({name:name.trim(),age,course})
        res.status(201).json({message:"Student created successfully",student})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
    }
}

const getStudentById = async (req,res) => {
    try {
        const {id} = req.params
        const student = await Student.findById(id)
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json(student)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
    }
}

const updateStudent = async (req,res) => {
    try {
        const {name,age,course} = req.body
        const {id} = req.params

        // updated is going to hold the latest value of student
        const updated = await Student.findByIdAndUpdate(id,{name,age,course},{new:true,runValidators:true})
        
        // updated varialble will hold the old value of student
        // const updated = await Student.findByIdAndUpdate(id,{name,age,course})
        if(!updated){
            res.status(404).json({error:"Student not found"})
        }
        res.status(200).json(updated)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
    }
}

const deleteStudent = async (req,res) => {
    try {
        const {id} = req.params
        const deleted = await Student.findByIdAndDelete(id)
        if(!deleted){
            return res.status(404).json({message:"student not found"})
        }
        res.status(200).json({message:"student deleted successfully",deleted})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"something went wrong"})
    }
}

module.exports = {getStudents,createStudent,getStudentById,updateStudent,deleteStudent}