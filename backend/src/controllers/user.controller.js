import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import {
  getAllUsers,
  searchUsers as searchUsersService,
} from "../services/user.service.js";

export const searchUsers = async (req, res, next) => {
  try {
    const keyword = req.query.search;
    if (!keyword) {
      logger.error("Please add a search query first");
      throw createHttpError.BadRequest("oops.... something Went wrong");
    }
    const users = await searchUsersService(keyword, req.user.userId);

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const allUsers = await getAllUsers();
    res.status(200).json({
      status: "sucess",
      data: {
        allUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};
