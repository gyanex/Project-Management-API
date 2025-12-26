import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json(user);
});

export { registerUser };
