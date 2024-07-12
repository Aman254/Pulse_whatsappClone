import logger from "../configs/logger.config.js";
import { updateLatestMessage } from "../services/conversation.service.js";
import {
  createMessage,
  getConvoMessages,
  populateMessage,
} from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
  try {
    const user_id = req.user.user_id;
    /**Getting the Message from the Body */
    const { message, convo_id, files } = req.body;
    /**Verifying the the details sent in the Body */
    if (!convo_id || (!message && !files)) {
      //If the above condition does not satisfies logging the Error into console
      logger.error("Please provide a Conversation Id and  a Message body");
      //Also, on Error sending the response with error Code 400
      return res.sendStatus(400);
    }
    //Now if Everything is fine we are getting the data required
    const msgData = {
      sender: user_id,
      message,
      conversation: convo_id,
      files: files || [],
    };

    //Creating new Message with the help of a service create Message
    let newMessage = await createMessage(msgData);
    let populatedMessage = await populateMessage(newMessage._id);
    await updateLatestMessage(convo_id, newMessage);
    res.json(populatedMessage);
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (req, res, next) => {
  try {
    const convo_id = req.params.convo_id;
    if (!convo_id) {
      console.log(convo_id);
      logger.error("Please add a conversation Id in Params");
      res.sendStatus(400);
    }
    const messages = await getConvoMessages(convo_id);

    res.json(messages);
  } catch (error) {
    next(error);
  }
};
