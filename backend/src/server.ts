import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./db/DataBase";
import userRoute from "./routes/userlogin.route";
import webDataRoute from "./routes/data.route";

dotenv.config();

const app = express();
console.log("CLOUD NAME:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);
app.use(express.json());
app.use(cors());

app.use("/api", userRoute);
app.use("/api", webDataRoute);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});