// express is used to create servers, without this, we would have to manually handle HTTP req, routing, etc.
import express from "express";
import cors from "cors";
import "dotenv/config";         // to import the .env so we can access the secrets.

// clerk stores user authentication, if backend sends token, theis clerk middleware checks if its genuine.
import { clerkMiddleware } from "@clerk/express";

import User from "./models/user.js";
import connectDB from "./lib/db.js";

const app = express();

const PORT = process.env.PORT
const FRONTEND_URL = process.env.FRONTEND_URL

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

app.listen(PORT, () => {
    connectDB();
    console.log("Server is up and running on port :",PORT)
})