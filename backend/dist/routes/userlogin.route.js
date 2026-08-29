"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const router = express_1.default.Router();
router.post("/login", user_controller_1.Login);
router.post("/createManager", middleware_1.default, user_controller_1.createManager);
router.get("/listmanagers", middleware_1.default, user_controller_1.listManager);
exports.default = router;
