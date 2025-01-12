import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import {
  searchUser,
  sendMessage,
  getMessages,
  getRecentChats,
} from "../controllers/user.actions.controller.js";

const router = Router();

router.post("/search", verifyJWT, searchUser);
router.post("/send-message", verifyJWT, sendMessage);
router.post("/get-messages", verifyJWT, getMessages);
router.post("/recent-chats", verifyJWT, getRecentChats);

export default router;