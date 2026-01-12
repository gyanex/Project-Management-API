import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/respponseHandler";
import ApiError from "../utils/errorHandler";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.registerUser(req.body);
  res.status(201).json(new ApiResponse(true, "Registered Successfully", user));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const token = await userService.loginUser(req.body.email, req.body.password);
  res
    .status(200)
    .json(new ApiResponse(true, "logged in successfully", { token: token }));
});

const fetchUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.fetchUser((req as any).user.userId);
    return res
      .status(200)
      .json(new ApiResponse(true, "fetched user successfully", { user: user }));
  }
);

export { registerUser, loginUser, fetchUser };
