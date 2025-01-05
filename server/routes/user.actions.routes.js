import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { searchUser } from "../controllers/user.actions.controller.js";

const router = Router();

router.post("/search", verifyJWT, searchUser);

export default router;