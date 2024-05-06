import express from "express";
import trimRequest from "trim-request";
import {
  login,
  logout,
  register,
  refreshToken,
} from "../controllers/auth.controller.js";
import authMiddlware from "../middlewares/authMiddlware.js";

const router = express.Router();

router.route("/register").post(trimRequest.all, register);

router.route("/login").post(trimRequest.all, login);

router.route("/logout").post(trimRequest.all, logout);

router.route("/refreshtoken").post(trimRequest.all, refreshToken);
router
  .route("/testingauthMiddleware")
  .get(trimRequest.all, authMiddlware, (req, res) => {
    res.send(req.user);
  });

export default router;
