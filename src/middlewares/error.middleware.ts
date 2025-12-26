import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/errorHandler";

export const globalError = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({ message });
};
