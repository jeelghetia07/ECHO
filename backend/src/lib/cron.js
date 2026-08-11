import { CronJob } from "cron"
import { log } from "node:console";
import http from "node:http";
import https from "node:https";

// every 14 min, it sends a GET reequest to the health endpoint.
const job = new CronJob("*/14 * * * *", function () {
    /* If the code is running on the computer "npm run dev", then it will take the url from .env
        but if the code is deployed and then we click the link echo.com then the url is fetched from the RENDER env. */
    const base = process.env.FRONTEND_URL;
    if(!base) return;

    /* This creates health url */
    const url = new URL("/health", base).href;      // this creates "https://myapp.onrender.com/health", here .href gets the url as a string.
    const client = url.startsWith("https:") ? https : http;

    /* This sends th GET request.
        the client = https / http
        after here the "url" is sent, then the response "res" contains a statusCode
         */
    client.get(url, (res) => {
            if(res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET request failed", res.statusCode);
        })
        .on("error", (e) => console.error("Error while sending request", e));
    });

export default job;