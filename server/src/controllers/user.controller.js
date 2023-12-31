import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import bcrypt from 'bcrypt';
import { ApiResponse } from '../utils/ApiResponse.js';
import { upload } from '../middlewares/multer.middleware.js';

const registerUser = asyncHandler(async (req, res) => {
    //  get user details from the frontend
    const { fullName, email, username, password } = req.body

    // validations - (non-empty)
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    // check if user already exits : email,username
    const existingUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }

    // check for image,check for avtar and coverImage
    const avtarLocalPath = req.files?.avatar[0]?.path; // this is on the localPath not uploaded to the cloudinary thats why we are using the local path

    const coverLocalPath = req.files?.coverImage[0]?.path; // this will give the local path of the cover image

    if (!avtarLocalPath) {
        throw new ApiError(400, "Avtar file is required")
    }


    // upload image to the cloudinary
    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avtar file is required")
    }

    // create user object - create a entry in the db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // humne upr coverImage pe validations nahi lagayi thi isliye yhaan pe check kr rhe hai ki coverImage hai ya nahi agr hai toh url return krdo nahi toh empty string return krdo
        email,
        username: username.toLowerCase(),
        password

    })


    //  remove password , refersh token field from the response

    //  select method is used to select the fields that we want to return in the response here we are not returning password and refersh token in the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken "
    )


    // check for user creation
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registring the user")
    }



    // return response
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    )
})



export { registerUser }
