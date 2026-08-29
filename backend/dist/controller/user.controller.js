"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listManager = exports.createManager = exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_1 = __importDefault(require("../Token/token"));
const passwordhashing_1 = require("../config/passwordhashing");
const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res
                .status(400)
                .json({ message: "Please enter username and password" });
        }
        // Super Admin Login
        if (username === process.env.SuperAdmin &&
            password === process.env.SuperAdminPassword) {
            const adminToken = (0, token_1.default)(username);
            const user = { role: "superadmin", username: username };
            return res
                .status(200)
                .json({ token: adminToken, message: "Super Admin Login Successful", user });
        }
        //  Normal User Login
        const user = await user_model_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const userToken = (0, token_1.default)(user._id.toString());
        return res
            .status(200)
            .json({ token: userToken, message: "Login Successful", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.Login = Login;
//create manager 
const createManager = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            console.log("Please enter username and password");
            return res.status(400).json({ message: "Please enter username and password" });
        }
        const existingUser = await user_model_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await (0, passwordhashing_1.hashPassword)(password);
        const user = new user_model_1.default({
            username, password: hashedPassword
        });
        await user.save();
        const userToken = (0, token_1.default)(user._id.toString());
        return res.status(200).json({ message: "Manager created successfully", token: userToken });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.createManager = createManager;
//list the manager 
const listManager = async (req, res) => {
    try {
        const users = await user_model_1.default.find({ role: "manager" });
        return res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.listManager = listManager;
