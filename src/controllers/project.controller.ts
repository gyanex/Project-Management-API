import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import * as projectService from "../services/project.service";
import { ApiResponse } from "../utils/respponseHandler";

export const addProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const project = await projectService.addProject(
      name,
      description,
      (req as any).user?.userId
    );
    return res
      .status(201)
      .json(new ApiResponse(true, "Project added successfully", project));
  }
);

export const getProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.projectId;
    const project = await projectService.getProjectById(
      projectId,
      (req as any).user?.userId
    );
    return res
      .status(200)
      .json(new ApiResponse(true, "Project fetched Successfully", project));
  }
);

export const getProjectByUserId = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.userId;
    const projects = await projectService.getProjectByUserId(userId);
    res
      .status(200)
      .json(new ApiResponse(true, "Projects fetched successfully", projects));
  }
);

export const updateProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const project = await projectService.updateProject(
      req.params.projectId,
      (req as any).user.userId,
      req.body
    );
    res
      .status(200)
      .json(new ApiResponse(true, "Project updated successfully", project));
  }
);
