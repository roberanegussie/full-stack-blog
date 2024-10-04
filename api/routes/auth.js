import express  from "express";
import { login, logout, register } from "../controllers/auth.js";
import { validateRegister } from "../validators/authValidator.js";
const router = express.Router();

router.post("/register", validateRegister,register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
 