import express from "express"
import { config } from "dotenv";
export const app = express();
import taskRouter from "./routes/task.js"
import userRouter from "./routes/user.js"
import { ErrorHandler, errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { sendResponse } from "./utils/features.js";
import cors from "cors";
config()
app.use(cors({
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/user", userRouter);
app.all("*", (req, res, next) => {
    next(new ErrorHandler("unknown request", 400));
});
app.use(errorMiddleware);