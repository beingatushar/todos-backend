import User from "../models/user.js";
import bcrypt from "bcrypt";
import { expireCookies, sendCookie, sendResponse } from "../utils/features.js";
import { ErrorHandler } from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
export const register = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    console.log(user);
    if (user) {
        return next(new ErrorHandler("User already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS));
    user = await User.create({ name, email, password: hashedPassword });
    sendCookie(res, user);
    sendResponse(res, "registered successfully", 201, undefined);
})
export const login = catchAsyncError(async (req, res, next) => {
    expireCookies(req, res);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    sendCookie(res, user);
    sendResponse(res, "logged in successfully", 200, undefined);
})
export const logout = (req, res) => {
    expireCookies(req, res);
    sendResponse(res, "logged out successfully", 200, undefined);
}
export const getMyProfile = catchAsyncError(async (req, res, next) => {
    sendResponse(res, undefined, 200, { user: req.user });
})