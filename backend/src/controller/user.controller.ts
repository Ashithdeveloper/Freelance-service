import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model";
import generateToken from "../Token/token";
import { hashPassword } from "../config/passwordhashing";

export const Login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please enter username and password" });
    }

    // Super Admin Login
    if (
      username === process.env.SuperAdmin &&
      password === process.env.SuperAdminPassword
    ) {
      const adminToken = generateToken(username);
      const user = { role : "superadmin" , username : username };
      return res
        .status(200)
        .json({ token: adminToken, message: "Super Admin Login Successful" ,  user });
    }

    //  Normal User Login
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const userToken = generateToken(user._id.toString());

    return res
      .status(200)
      .json({ token: userToken, message: "Login Successful" , user  });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//create manager 

export const createManager = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({ message: "Please enter username and password" });
    }
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await hashPassword(password);
    const user = new userModel({ 
        username, password: hashedPassword 
    });

    await user.save();
    const userToken = generateToken(user._id.toString());

    return res.status(200).json({ message: "Manager created successfully" , token: userToken});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//list the manager 

export const listManager = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find({ role: "manager" });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
