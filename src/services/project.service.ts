import { HydratedDocument } from "mongoose";
import { IProject } from "../models/IProject";
import { Project } from "../schemas/project.schema";
import ApiError from "../utils/errorHandler";
import { count } from "node:console";

export const addProject = async (
  name: string,
  description: string,
  userId: string
) => {
  const data: IProject = {
    name: name,
    owner: userId,
    members: [userId],
    description: description,
  };
  const project = await Project.create(data);
  return project;
};

export const getProjectById = async (projectId: string, userId: string) => {
  if (!projectId) {
    throw new ApiError(400, "No project Id found");
  }
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "No project found");
  }
  const isMember =
    project.owner.toString() === userId || project.members.includes(userId);
  if (!isMember) {
    throw new ApiError(403, "Access Denied");
  }
  return project;
};

export const getProjectByUserId = async (userId: string) => {
  const projects = await Project.find({
    $or: [{ owner: userId, members: userId }],
  });
  if (projects.length === 0) {
    throw new ApiError(404, "No project found");
  }
  return projects;
};

export const updateProject = async (
  projectId: string,
  userId: string,
  data: Partial<IProject>
) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "No Project Found");
  }
  if (project.owner.toString() !== userId) {
    throw new ApiError(403, "Ask owner to update this project");
  }
  Object.assign(project, data);
  await project.save();

  return project;
};

// Write an aggregation query to fetch:

// Movies released after 2015

// Along with comment count

// Only return movies that have more than 5 comments

// Hint: $match → $lookup → $project → $match
