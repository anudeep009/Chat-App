import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import {
  searchUser,
  sendMessage,
  getMessages,
} from "../controllers/user.actions.controller.js";

const router = Router();

router.post("/search", verifyJWT, searchUser);
router.post("/send-message", verifyJWT, sendMessage);
router.post("/getMessages", verifyJWT, getMessages);

export default router;
