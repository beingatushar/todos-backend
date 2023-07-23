import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";
import User from "../models/user.js";
import { catchAsyncError } from "./catchAsyncError.js"
export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("login first", 400));
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(_id);
    next();
})