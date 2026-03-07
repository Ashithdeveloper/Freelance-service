import { CronJob } from "cron";
import https from "https";
import dotenv from "dotenv";

dotenv.config();

const job = new CronJob("*/14 * * * *", function () {
  const url = process.env.API_URL;
  console.log("API_URL", url);

  if (!url) {
    console.error("API_URL is not defined in env");
    return;
    
  }

  https
    .get(url, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (err) => {
      console.error("Error while sending request", err);
    });
});

export default job;
