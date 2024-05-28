import express from "express";
import { getMessages, sendMessage } from "../controllers/message.js";
import { verifyUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/send/:id", verifyUser, sendMessage);
router.get("/:id", verifyUser, getMessages);


export default router;