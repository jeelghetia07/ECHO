import User from "../models/user.js"
import Message from "../models/message.js"
import { hasImageKitConfig } from "../lib/imagekit.js";
import { io, getReceiverSocketId } from "../lib/socket.js"

export async function getUsersForSideBar(req, res) {
    try{
        const loggedInUserId = req.user_.id;
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-clerkId");

        res.status(200).json(filteredUsers);
    }catch(err){
        console.error("Error in getUserForSideBar: ", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getConversationsForSideBar(req, res) {
    try {
        const loggedInUserId = req.user_.id;
        const conversations = await Message.aggregate([
            // 1. Keep only the messages sent or received
            {$match: {$or: [{ senderId: loggedInUserId}, {receiverId: loggedInUserId}]}},
            // 2. Collapse them into one row per chat partner, nothing our lastest message time.
            {
                $group: {
                    // The partner is the other person on the message (not me).
                    _id: {$cond: [{$eq: ["$senderIs", loggedInUserId]}, "$receiverId", "$senderId"]},
                    lastMessageAt: {$max: "$createdAt"},
                },
            },
            // 3. Put the most recent conversation at the top.
            { $sort: {lastMessageAt: -1}},
            // 4. Look up each partner's user profile (comes back as an array).
            { $lookup: {from: "users", localField: "_id", foreignField: "_id", as: "user"}},
            // 5. Pull that profile out the array and make it the document.
            {$replaceRoot: {newRoot: {$first: "$user"}}},
            // 6. Hide the private clerkId field from the result.
            {$project: {$clerkId: 0}},
        ]);

        res.status(200).json(conversations);
    }catch(err){
        console.error("Error in getConversationsForSidebar.", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function getMessages(req, res){
    try{
        const {id: userToChatId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                {senderId: myId, receiverId: userToChatId},
                {senderId: userToChatId, receiverId: myId},
            ]
        }).sort({createdAt: 1});        // this means in ascending order.

        res.status(200).json(messages);

    }catch(err){
        console.error("Error in getMessages.", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}

export async function sendMessages(req, res){
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        let videoUrl;

        if(req.file){
            if(!hasImageKitConfig()){
                return res.status(500).json({message: "Media upload is not configured"});
            }

            const url = await uploadChatMedia(req.file);
            if(req.file.mimetype.startsWith("video/")) videoUrl = url;
            else imageUrl = url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
            video: videoUrl,
        })

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        // only send messages in real time if the user is online.
        if(receiverSocketId){
            io.to(receiverSocketId).emit("new Message", newMessage);
        }
        res.status(201).json(newMessage);
    }catch(err) {
        console.error("Error in sendMessages.", err.message);
        res.status(500).json({message: "Internal server error"});
    }
}