import createHttpError from "http-errors";
import { ConversationModel, UserModel } from "../models/index.js";

export const doesConversationExist = async (sender_id, receiver_id) => {
  //Checking for the Receiver and SenderIds in the conversation Models
  let convo = await ConversationModel.find({
    //As it is a Conversation between 2 not a group so the group property should bve false
    isGroup: false,
    //Now, after verifying the group lets check for few more in the users of Conversation model
    /**So to Search Multiple things inside an array we use:  */
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],

    //Now that if we find the Convo we need to populate Few Things
    /**Here we use "-password" because we dont want to show the password */
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //Now if there is No Convo throw Errors
  if (!convo) throw createHttpError.BadRequest("Oops... Something Went Wrong");

  //Populate Message Model

  convo = await UserModel.populate(convo, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  //If Everything is Fine / the Conversation Exists then Return the convo
  return convo[0];
};

export const createConversation = async (data) => {
  //Here we are creating the Copnversation with the Parameter received
  const newConvo = await ConversationModel.create(data);
  //Handling/Throwing Error if there is, while creating new Conversation
  if (!newConvo)
    throw createHttpError.BadRequest("OOOps, ....Something went Wrong");

  //If the Conversation is created sucessfully then we are return the new convo after creating it
  return newConvo;
};

export const populateConversation = async (
  id,
  fieldsToPopulate,
  fieldsToRemove
) => {
  const populateConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldsToPopulate,
    fieldsToRemove
  );

  if (!populateConvo)
    throw createHttpError.BadRequest("OOOOps....Something went wrong");

  return populateConvo;
};
