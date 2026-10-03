import { getAuth } from "@clerk/express";
import User from "../models/user.js";

export async function protectRoute(req, res, next){
    try{
        // This is the main middleare which checks if the user is authenticated or not.
        // this asks :- "Is this request coming from a logged-in Clerk user?"
        const {userId} = getAuth(req);
        if(!userId){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        // This checks, does the MongoDB have this clerk User stored or not.
        const user  = await User.findOne({clerkId: userId});
        if(!user){
            res.status(404).json({message: "User profile not synced yet."});
            return;
        }

        req.user = user;

        next();
    }catch(err){
        console.error("Error in protectiveRoute middleware.", err.message);
        res.status(500).json({message: "Internal server error."});
    }
}