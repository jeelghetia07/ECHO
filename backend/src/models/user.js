// mongoose helps us to interact Node.js ----> Mongoose ----> DB.
import mongoose from "mongoose"

// Made a structure that every user will have.
//  nothing is stored yet in MongoDB, but "Every user document should look like this."
const userSchema = new mongoose.Schema(
    {
        clerkId:{
            type:String,
            required: true,
            unique: true,           // every user has a unique email
        },
        email: {
            type:String,
            required:true,
            unique: true,
        },
        fullName: {
            type:String,
            required:true,
        },  
        profilePic:{
            type:String,
            default: "" ,        // its not needed for a compulsory Pic, so if its not there, its an empty string.
        }
    },
    {
        timestamps: true            // createdAt & updatedAt
    },
);


const User = mongoose.model("User", userSchema)

export default User