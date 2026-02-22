import jwt from "jsonwebtoken";

const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "10d",
  });
};

export default generateToken;
