import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/fileUpload.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, username, password } = req.body;
    console.log("email----", email)

    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) throw new ApiError(409, "User with email or username alredy exist")

    const avatarLocalPAth = req.files?.avatar[0]?.path
    const coverImageLocalPAth = req.files?.coverImage[0]?.path;

    if (!avatarLocalPAth) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPAth)
    const coverImage = await uploadOnCloudinary(coverImageLocalPAth)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    
    if(!createdUser) throw new ApiError(500, "Something went wrong  while registering the user")
    
    return res.status(201).json(
        new ApiResponse(200, createdUser,"User registered successfully")
        )
})

export { registerUser }