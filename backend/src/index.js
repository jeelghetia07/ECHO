// express is used to create servers, without this, we would have to manually handle HTTP req, routing, etc.
import express from "express";
import cors from "cors";
import "dotenv/config";         // to import the .env so we can access the secrets.
import fs from "fs";     // import file systems.
import path from "path";
import job from "./lib/cron.js";
import { clerkMiddleware } from "@clerk/express"; // clerk stores user authentication, if backend sends token, theis clerk middleware checks if its genuine.
import User from "./models/user.js";
import connectDB from "./lib/db.js";
import clerkWebhook from "./webhooks/clerk.webhook.js";

// Version 1.0
const app = express();

const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL

// this means join te current working directory and find the public folder....
const publicDir = path.join(process.cwd(), "public");           // because  we mentioned in the dockerfile stage 3 as the cwd as /app and the /public folder had the "dist"(compressed verision of all files) file for the frotend. 

// its imp that you dont parse the webhook event data, it should be in the raw format.
app.use("/api/webhooks/clerk", express.raw({type: "application/json"}), clerkWebhook);

app.use(express.json());

// suppose FRONTEND_URL = http://localhost:5173
// Here, express tells the browser, "only requests coming from this url are allowed."
app.use(cors({
    origin:FRONTEND_URL,            // allows requests from this frontend only.
    credentials:true        // when the user logins, the browsercookies, JWT tokens, sessions IDs etc. Hence this allows credentials (such as authentication cookies) to be included in cross-origin requests.
}));

app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ok: true})
})

// if the public directory exists, serve the static files
// this is for the production build
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir));

    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}

// this will start the application so here we start the cron job after connecting to the DB
app.listen(PORT, () => {
    connectDB();
    console.log("Server is up and running on port :",PORT)

    /* In the laptop it will be development, and after deploying it, the render will automatically change it into production */
    if(process.env.NODE_ENV === "production") {     
        job.start();
    }
});

