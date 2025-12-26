import { IUser } from "../models/IUser";
import User from "../schemas/user.schema";
import ApiError from "../utils/errorHandler";

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
