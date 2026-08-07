import mongoose from "mongoose";

// we can use this Message model anytime we want to talk with the DB.

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,           // this will be an object id.
        ref: "User",
        required: true,
    },
    recieverId:{
        type: mongoose.Schema.Types.ObjectId,           // we send these both with refrence to the user ID.
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

// we will use this object to get messages, create them, update or delete
const Message = mongoose.model("Message", messageSchema);       // we created the model, and then export it

export default Message;