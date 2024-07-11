import express from "express";
import authRoutes from "./auth.route.js";
import ConversationRoutes from "./conversation.route.js";
import getConversationRoutes from "./conversation.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", ConversationRoutes);
router.use("/conversation", getConversationRoutes);

export default router;
