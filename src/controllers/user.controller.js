import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;

  if (
    [fullName, email, userName, password].some((field) => field.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });

  if (existedUser) {
    throw new ApiError(409, "User is Already exist");
  }

  const avatarLocalPath = req?.files?.avatar?.[0];
  const coverImageLocalPath = req?.files?.coverImage?.[0];

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    userName: userName.toLowercase(),
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createUser, "User Register successfully"));
});

export { registerUser };
