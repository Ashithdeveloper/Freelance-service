import express from "express";
import { createManager, listManager, Login } from "../controller/user.controller";
import authMiddleware from "../middleware/middleware";


const router = express.Router();

router.post("/login", Login)
router.post("/createManager",authMiddleware ,createManager)
router.get("/listmanagers",authMiddleware ,listManager)


export default router