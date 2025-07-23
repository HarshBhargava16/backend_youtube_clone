import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstant = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.error("data base connection error", error);
    process.exit(1);
  }
};

export default connectDB;
