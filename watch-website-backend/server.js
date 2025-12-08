import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"

const app = express()
app.use(express.json())

connectDB()
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})