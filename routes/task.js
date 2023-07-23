import { Router } from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Router();

router.post("/new", isAuthenticated, createTask);
router.get("/all", isAuthenticated, getAllTasks);
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);
export default router;