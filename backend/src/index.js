import express from "express";
import "dotenv/config";         // to import the .env so we can access the secrets.

const app = express();
const PORT = process.env.PORT

// console.log("DB_URL=", process.env.DB_URL);

app.listen(PORT, () => console.log("Server is up and running on port :",PORT))