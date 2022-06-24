import mongoose from "mongoose";
import env from 'dotenv';
env.config();


const connectDB =async (DB_URL)=>{
    try {
        const DB_OPTIONS ={
            dbName : 'UserDetail'
        }
        await mongoose.connect(DB_URL, DB_OPTIONS)
        console.log('MongoDB Connection Successful')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;