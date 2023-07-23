import jwt from "jsonwebtoken";

export const sendCookie = (res, user) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    })
};
export const expireCookies = (req, res) => {
    req.user = undefined;
    res.cookie("token", "", {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
        expires: new Date(Date.now())
    })
}
export const sendResponse = (res, message, statusCode, data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data
    })
}