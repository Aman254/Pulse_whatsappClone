import createHttpError from "http-errors";
import { MessageModel } from "../models/index.js";

export const createMessage = async (msgData) => {
  let newMessage = await MessageModel.create(msgData);

  if (!newMessage) throw createHttpError.BadRequest("Something went wrong");

  return newMessage;
};

export const populateMessage = async (id) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "name picture email status",
      model: "UserModel",
    })
    .populate({
      path: "conversation",
      select: "name isgroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "name email picture status",
        model: "UserModel",
      },
    });
  if (!msg) throw createHttpError.BadRequest("Something Went Wrong");

  return msg;
};

export const getConvoMessages = async (convo_id) => {
  const messages = MessageModel.find({ conversation: convo_id })
    .populate("sender", "name email picture status")
    .populate("conversation");
  if (!messages) throw createHttpError.NotFound("Opps.. Somrthing went wrong");

  return messages;
};
