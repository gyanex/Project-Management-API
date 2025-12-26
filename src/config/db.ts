import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  console.log(process.env.MONGO_URI);
  try {
    const connected = await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Mongo db connected successfully");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
export default connectDb;
