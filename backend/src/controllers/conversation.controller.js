import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  createConversation,
  doesConversationExist,
  getUserConversation,
  populateConversation,
} from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const create_open_conversation = async (req, res, next) => {
  try {
    //getting Sender id from the AuthMiddleware and We are loggin in and then Making the Request
    const sender_id = req.user.userId;
    // Now getting the receiver Id to whom we are sending the message from the body
    const { receiver_id } = req.body;
    //Checking if The user provided the receiver Id or Not and Giving Error Messages
    if (!receiver_id) {
      logger.error(
        "Please provide the user Id you wanna start the conversation with."
      );
      throw createHttpError.BadGateway("Something went Wrong");
    }
    //Check if Chats Exist by creating a function in conversation service to verify
    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );
    //If the Conversation already existed then send the conversation in json form.
    if (existed_conversation) {
      res.json(existed_conversation);
      //If the conversation does not exist we need to create the conversation
    } else {
      //Findind the user with the Receiver id with help of the service finduser
      let receiver_user = await findUser(receiver_id);
      //After we found the user then extracting the details form it.
      let convoData = {
        name: receiver_user.name,
        isGroup: false,
        users: [sender_id, receiver_id],
      };
      //Now as we have the Data we are creating the new Conversation with help of a service createConversation
      const newConvo = await createConversation(convoData);

      //populating few more details
      const populatedConvo = await populateConversation(
        newConvo._id,
        "users",
        "-password"
      );

      //Now that we have the created the Conversation, we send as a response.
      res.status(200).json(populatedConvo);
    }
  } catch (error) {
    next(error);
  }
};

export const getConversations = async (req, res, next) => {
  try {
    //Firstly, getting the userId Id that is Logged in right now
    const user_id = req.user.userId;
    //Creating a service getUserConversation and Waiting for it to resolve
    const conversations = await getUserConversation(user_id);
    //after the getUserConversation is resolved send it in json form and with statusCode 200
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
