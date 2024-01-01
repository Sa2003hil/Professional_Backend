import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.models.js'
import { ApiError } from '../utils/ApiError.js'
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
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User already exists")
    }


    // check for image,check for avtar and coverImage
    const avtarLocalPath = req.files?.avatar[0]?.path; // this is on the localPath not uploaded to the cloudinary thats why we are using the local path


    // this will give the local path of the cover image
    // const coverLocalPath = req.files?.coverImage[0]?.path;

    /* 
    
    this coverLocalPath gives undefined ( TypeError: Cannot read properties of undefined (reading &#39;0&#39;) these undefined errors mostly comes in the case of optional chaining, we can use classical if else to check this

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverLocalPath = req.files.coverImage[0].path
    }
 
    --> here we are checking for req.files then we are checking for coverImage is an array or not then we are checking for the length of the coverImage array is greater > 0 or not then we are assigning the coverLocalPath to the path of the coverImage[0] (first element of the coverImage array)
    
    coverImage: [
    {
      fieldname: 'coverImage',
      originalname: 'Screenshot (23).png',
      encoding: '7bit',
      mimetype: 'image/png',
      destination: './public/temp',
      filename: 'Screenshot (23).png',
      path: 'public\\temp\\Screenshot (23).png',
      size: 1078633
    }
]
    
    */

    let coverLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverLocalPath = req.files.coverImage[0].path
    }


    if (!avtarLocalPath) {
        throw new ApiError(400, "Avtar file is required")
    }


    // upload image to the cloudinary
    const avatar = await uploadOnCloudinary(avtarLocalPath)
    const coverImage = await uploadOnCloudinary(coverLocalPath)

    // agar hume coverImage ka localpath nahi mila to vo humein error nahi dega  that is the good thing about cloudinary that only returns an empty string   

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
