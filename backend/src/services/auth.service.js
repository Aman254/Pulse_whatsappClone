import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import bcrypt from "bcryptjs";
import { verify } from "../utils/token.utils.js";

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  //Check if fields are empty
  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all Fields");
  }

  //check name length
  if (
    !validator.isLength(name, {
      min: 3,
      max: 16,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 3 and 16 Characters"
    );
  }

  //Check status length
  if (status && status.length > 64) {
    throw createHttpError.BadRequest(
      "Please make sure your status is less than 64 Caharacters"
    );
  }

  //check if email address is valid
  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest("Please provide a valid Email Address");
  }

  //Check if user already exists
  const checkDb = await UserModel.findOne({ email });
  if (checkDb) {
    throw createHttpError.Conflict("The Email Address Already Exists");
  }

  //check password length
  if (
    !validator.isLength(password, {
      min: 3,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure yyour password is between 6 and 128"
    );
  }

  //hash password ...User Model

  const user = await new UserModel({
    name,
    email,
    picture: picture || "https://avatar.iran.liara.run/public",
    status: status || "Hey there, am using Pulse",
    password,
  }).save();
  return user;
};

export const signUser = async (email, password) => {
  const user = await UserModel.findOne({ email: email.toLowerCase() }).lean();

  // Check if user Exist
  if (!user) throw createHttpError.NotFound("Invalid Credentials.");

  //comapre passwords

  let passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) throw createHttpError.NotFound("Invalid Credentials");

  return user;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};
