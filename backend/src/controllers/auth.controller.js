import createHttpError from "http-errors";
import { createUser, signUser, verifyToken } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";
import { findUser } from "../services/user.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;
    const user = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });
    const acess_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 1000, //30days
    });
    console.table({ acess_token, refresh_token });

    res.status(200).json({
      status: "Sucess",
      token: acess_token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);
    const acess_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.ACCESS_TOKEN_SECRET
    );

    const refresh_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.REFRESH_TOKEN_SECRET
    );

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 1000, //30days
    });
    console.table({ acess_token, refresh_token });

    res.status(200).json({
      status: "Sucess",
      token: acess_token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", { path: "/api/v1/auth/refreshtoken" });
    res.status(200).json({
      status: "Sucess",
      message: "Logged Out Sucessfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) throw createHttpError.Unauthorized("Please Login");
    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await findUser(check.userId);
    const acess_token = await generateToken(
      { userId: user._id },
      process.env.TOKEN_EXPIRE,
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({
      acess_token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        status: user.status,
      },
    });

    res.json(check);
  } catch (error) {
    next(error);
  }
};
