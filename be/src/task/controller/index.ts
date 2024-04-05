import { resetpassword } from "./../../user/controller/index";
import { NextFunction, Request, Response } from "express";
import {
  fetchAllTasksAssignedByUser,
  fetchCompletedTasks,
  fetchCompletedTasksAssignedByUser,
  fetchDeletedTasks,
  fetchEditedTasks,
  fetchPendingTasks,
  fetchPendingTasksAssignedByUser,
  fetchSingleTask,
  fetchTask,
  postTask,
  searchSpecificTask,
} from "../services";
import { catchAsync } from "../../utils/catchAsync";
import { appError } from "../../utils/appError";

export const createTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status, message } = await postTask({ ...req.body });
    if (status === 409) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message });
  }
);
export const getTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const { priority, taskStatus, searchQuery } = req.query;
    const searchRegex = searchQuery
      ? new RegExp(searchQuery as string, "i")
      : undefined;

    const filters = searchRegex
      ? {
          title: searchRegex,
        }
      : {};

    const { status, message, task } = await fetchTask(
      user,
      priority as string,
      taskStatus as string,
      filters
    );
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, task: task });
  }
);

export const getCompletedTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;

    const { status, message, tasks } = await fetchCompletedTasks(user);
    if (status === 404) {
      next(new appError(status, "No tasks has been completed"));
    }
    return res.status(status).json({ message: message, task: tasks });
  }
);

export const getPendingTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const { status, message, tasks } = await fetchPendingTasks(user);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, task: tasks });
  }
);

export const getEditedTasks = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await fetchEditedTasks(id, req.body);
    if (status === 404 || status === 400) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);

export const getDeletedTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message } = await fetchDeletedTasks(id);
    if (status === 404 || status === 400) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message });
  }
);

export const getSingleTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status, message, data } = await fetchSingleTask(id);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);

export const getPendingTasksAssignedByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const { status, message, data } = await fetchPendingTasksAssignedByUser(
      user
    );
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);
export const getCompletedTasksAssignedByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const { status, message, data } = await fetchCompletedTasksAssignedByUser(
      user
    );
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);
export const getAllTasksAssignedByUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    const { status, message, data } = await fetchAllTasksAssignedByUser(user);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);

export const searchTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    const { status, message, data } = await searchSpecificTask(q as string);
    if (status === 404) {
      next(new appError(status, message));
    }
    return res.status(status).json({ message: message, data: data });
  }
);
