import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

// we have both the server and http server.
const io = new Server(server, {cors: {origin: [allowedOrigin]}});

function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

//online users map {userId, socketId};
const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if(userId) userSocketMap[userId] = socket.id;

    // this sends the event to everyone.. (broadcasts it to all).
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    // socket.on() is used to litsen for events.
    socket.on("disconnect", () => {
        if(userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }) 
});

export { app, server, io, getRecieverSocketId};