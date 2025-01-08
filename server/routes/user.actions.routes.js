import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { searchUser, sendMessage } from "../controllers/user.actions.controller.js";

const router = Router();

router.post("/search", verifyJWT, searchUser);
router.post("/send-message", verifyJWT, sendMessage);

export default router;