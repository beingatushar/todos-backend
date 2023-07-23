import { Task } from "../models/task.js";
import { ErrorHandler } from "../middlewares/error.js"
import { sendResponse } from "../utils/features.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
export const createTask = catchAsyncError(async (req, res, next) => {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, user: req.user });
    sendResponse(res, "Task created successfully", 201, { task })
})
export const getAllTasks = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const tasks = await Task.find({ user });
    sendResponse(res, undefined, 200, { tasks })
})
export const updateTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task)
        return next(new ErrorHandler("Task doesnt exist", 404));
    task.isCompleted = !task.isCompleted;
    await task.save();
    sendResponse(res, "Task updated successfully", 201, undefined);
})
export const deleteTask = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const task = await Task.findOne({ _id: id });
    if (!task)
        return next(new ErrorHandler("Task doesnt exist", 404));
    await task.deleteOne();
    sendResponse(res, "Task deleted successfully", 200, undefined);
})
