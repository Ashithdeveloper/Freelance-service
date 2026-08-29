"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// The 4th parameter 'true' tells the job to start immediately
const job = new cron_1.CronJob("*/14 * * * *", function () {
    const url = process.env.API_URL;
    if (!url) {
        console.error("API_URL is not defined in env");
        return;
    }
    https_1.default
        .get(url, (res) => {
        console.log(`Request to ${url} status: ${res.statusCode}`);
    })
        .on("error", (err) => {
        console.error("Error while sending request", err);
    });
}, null, // onComplete
true);
exports.default = job;
