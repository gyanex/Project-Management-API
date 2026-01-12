import { IUser } from "../models/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: IUser["role"];
      };
    }
  }
}

export {};
