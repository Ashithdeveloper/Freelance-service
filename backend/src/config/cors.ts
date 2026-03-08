import { CronJob } from "cron";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

// The 4th parameter 'true' tells the job to start immediately
const job = new CronJob(
  "*/14 * * * *",
  function () {
    const url = process.env.API_URL;

    if (!url) {
      console.error("API_URL is not defined in env");
      return;
    }

    https
      .get(url, (res) => {
        console.log(`Request to ${url} status: ${res.statusCode}`);
      })
      .on("error", (err) => {
        console.error("Error while sending request", err);
      });
  },
  null, // onComplete
  true, // Start the job right now!
);

export default job;
