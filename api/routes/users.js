import express  from "express";
import { checkUser, getUser } from "../controllers/user.js";
import { updatePassword, updateUsername, updateEmail } from "../controllers/user.js";
import { validatePasswordReset } from "../validators/authValidator.js";

const router = express.Router();
router.get("/:id", getUser);
router.put("/updateUsername/:id",updateUsername)
router.put("/updateEmail/:id",updateEmail);
router.post("/checkUser",checkUser)
router.put("/updatePassword/:id",validatePasswordReset,updatePassword);
export default router;