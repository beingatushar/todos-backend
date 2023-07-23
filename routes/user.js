import { getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { Router } from "express"
const router = Router();


router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)
router.get("/me", isAuthenticated, getMyProfile)
export default router;