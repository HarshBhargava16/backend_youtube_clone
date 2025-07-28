import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

dotenv.config();

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded successfully on cloudinary", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(localFilePath, "hello hi", error);
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_key,
  api_secret: process.env.CLOUDINARY_secret,
});



export { uploadOnCloudinary };

