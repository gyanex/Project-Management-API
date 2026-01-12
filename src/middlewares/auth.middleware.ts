import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "../utils/errorHandler";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const secret = process.env.JWT_SECRET;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "login not found or something went wrong");
  }
  if (!secret) {
    throw new ApiError(500, "JWT secret not configured");
  }
  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, secret) as JwtPayload
    (req as any).user = {
      userId : decoded.userId,
      role: decoded.role
    }
    next();
  } catch (error) {
    throw new ApiError(401, "login expired");
  }
};
