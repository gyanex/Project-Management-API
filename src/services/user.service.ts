import { HydratedDocument } from "mongoose";
import { IUser } from "../models/IUser";
import User from "../schemas/user.schema";
import ApiError from "../utils/errorHandler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (userBody: IUser) => {
  if (
    [userBody.email, userBody.name, userBody.password, userBody.role].some(
      (d: string) => {
        return d.trim() === "";
      }
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  if (await User.findOne({ email: userBody.email })) {
    throw new ApiError(409, "user already exist");
  }
  const user = await User.create(userBody);
  if (!user) {
    throw new ApiError(500, "something went wrong");
  }
  return user;
};

export const loginUser = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError(400, "username and password required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new ApiError(401, "enter correct username and password");
  } else {
    return await generateJWT(user);
  }
};

export const generateJWT = async (user: HydratedDocument<IUser>) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("secret not found");
  }
  const payload = { userId: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const fetchUser = async (userId?: string) => {
  if (!userId) {
    throw new ApiError(500, "internal server error");
  }
  const user = await User.findById(userId).select("-password")
  return user;
};
