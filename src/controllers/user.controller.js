import {asyncHandler} from "../utils/asyncHandler.js";
import {apiError} from "../utils/apierror.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {apiResponce} from "../utils/apiresponce.js"

const registerUser = asyncHandler(async (req, res) => {
    const {fullname, email, username, password} = req.body
    console.log("Email: ", email);
    console.log("password: ", password);

    if(
        [fullname, email, username, password].some((field) =>
        field?.trim() === "")
    ){
        throw new apiError(400, "All fields are required");
    }

    const exictedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(exictedUser){
        throw new apiError(409, "User with username or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new apiError(400, "Avatar file is required")
    }

    User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500, "Something went wrong while registring the user")
    }

    return res.status(201).json(
        new apiResponce(200, createdUser , "User registered successfully")
    )
});

export {registerUser}