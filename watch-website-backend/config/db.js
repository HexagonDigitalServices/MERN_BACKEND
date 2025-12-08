import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL

const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB