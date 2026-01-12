import { Router } from "express";
import {
  addProject,
  getProjectById,
  getProjectByUserId,
  updateProject,
} from "../controllers/project.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
router.use(authMiddleware)
router.route("/").post(addProject);
router.route("/").get(getProjectByUserId);
router.route("/:projectId").get(getProjectById);
router.route("/:projectId").put(updateProject);
router.route("/:projectId").delete(getProjectById);
export default router;
