import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.post("/:projectId/tasks");

router.put("/:taskId");

router.delete("/:taskId");
