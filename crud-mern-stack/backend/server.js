const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const cors = require('cors')
const studentRoutes = require('./routes/student')

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/students',studentRoutes)

connectDB()

const PORT = process.env.PORT || 5001
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})