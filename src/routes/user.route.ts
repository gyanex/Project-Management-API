import { Router } from "express";
import {
  loginUser,
  registerUser,
  fetchUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/fetch-user").get(authMiddleware, fetchUser);

export default router;
