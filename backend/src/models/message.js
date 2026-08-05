import mongoose from "mongoose";

// we can use this Message model anytime we want to talk with the DB.

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,           // this will be an object id.
        ref: "User",
        required: true,
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,           // this will be an object id.
        ref: "User",
        required: true,
    },
    text:{
        type:String,
        
    },
    image:{
        type:String,         // eg "imagekit.io/image/afwefwfwe"
    },
    video:{
        type:String,

    },
},{timestamps:true})

const Message = mongoose.model("Message", messageSchema);

export default Message