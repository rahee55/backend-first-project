import {asyncHandler} from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "okay",
        username: "tariq55",
        password: "tariq123"
    })
});

export {registerUser}