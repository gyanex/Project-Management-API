import { Request, Response } from "express";
import User from "../schemas/user.schema";
import { IUser } from "../models/IUser";

const registerUser = async (req: Request, res: Response) => {
  const userBody: IUser = req.body;
  if (
    [userBody.email, userBody.name, userBody.password, userBody.role].some(
      (d: string) => {
        return d.trim() === "";
      }
    )
  ) {
    return res.status(401).json("all fields are mandatory");
  }
  if (await User.findOne({ email: userBody.email })) {
    return res.status(401).json("user already exist");
  }
  const user = await User.create(userBody);
  if (!user) {
    return res.status(401).json("something went wrong");
  }
  return res.status(201).json(user)
};

export { registerUser };
