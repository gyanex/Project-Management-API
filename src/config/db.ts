import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongo_uri = process.env.MONGO_URI
    if(!mongo_uri){
      throw new Error('mongo db connection string not found in env')
    }
    await mongoose.connect(mongo_uri);
    console.log("Mongo db connected successfully");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};
export default connectDb;
