import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js"

import userRouter from "./routes/userRoute.js"
import watchRouter from "./routes/watchRoute.js"
import cartRouter from "./routes/cartRoute.js"

const app = express()
app.use(express.json())

connectDB()

app.use("/api/auth",userRouter)
app.use("/api/watch",watchRouter)
app.use("/api/cart",cartRouter)

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})