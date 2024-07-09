import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  populateConversation,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    const sender_id = req.user.userId;

    const { receiver_id } = req.body;

    //Check if reciever Id is Provided
    if (!receiver_id) {
      logger.error(
        "Please provide the UserId you want to start a conversation with"
      );
      throw createHttpError.BadGateway("Something went wrong");
    }
    //check if chat exists
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );

    if (existed_conversation) {
      res.json(existed_conversation);
    } else {
      let receiver_user = await findUser(receiver_id);
      let convoData = {
        name: receiver_user.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      const newConvo = await createConversation(convoData);

      const populateConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );

      res.status(200).json(populateConvo);
    }
  } catch (error) {
    next(error);
  }
};
