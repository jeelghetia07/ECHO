// this is a lib that allows Node.js talk to MongoDB.
import mongoose from "mongoose";

// here we use the async func becoz multiple users cannot wait for the other one to complete his task so that the next can do his.
// all should do their own tasks simultaneously
const connectDB = async function connectDB(){

    // the connection can fail, so we send it in try block.
    try{
        // the process is a Node.js object.
        const mongoUri = process.env.MONGO_URI

        if(!mongoUri){
            throw new Error("MONGO_URI is required")
        }
        
        // if connection is success, MongoDB sends a connetion object
        // without await, if connection would take time, it would directly move to the next line.
        const conn = await mongoose.connect(mongoUri)
        console.log("MongoDB connected", conn.connection.host)
    }
    catch(error){
        console.error("MongoDB connection error : ", error.message);
        // if the DB connection failed, there is no meaning in keeping the backend server running so we stop it.
        process.exit(1);
        // 1 means failed, 0 means success.
    }
}

export default connectDB;