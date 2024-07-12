import express from "express";
import authRoutes from "./auth.route.js";
import userRoutes from "./user.route.js";
import ConversationRoutes from "./conversation.route.js";
import getConversationRoutes from "./conversation.route.js";
import getMessageRoutes from "./message.route.js";
import sendMessageRoutes from "./message.route.js";

const router = express.Router();

/**Authentication Routes */
router.use("/auth", authRoutes);

//User Routes
router.use("/user", userRoutes);

/**Conversation Routes */
router.use("/conversation", ConversationRoutes);
router.use("/conversation", getConversationRoutes);

/**Message Routes */
router.use("/message", sendMessageRoutes);
router.use("/message", getMessageRoutes);

//Exporting the Router
export default router;
