import { Router } from "express";
import { verifyToken } from "../middleware/authenticate";
import {
  createTask,
  getAllTasksAssignedByUser,
  getCompletedTasksAssignedByUser,
  getDeletedTask,
  getEditedTasks,
  getPendingTasks,
  getPendingTasksAssignedByUser,
  getSingleTask,
  getTask,
  searchTask,
  getCompletedTasks

} from "./controller";
import { validateResource } from "../middleware/validateResource";
import { TaskSchema } from "../schema/task.schema";

const router = Router();

const routes = () => {
  router.post(
    "/v1/tasks",
    verifyToken,
    validateResource(TaskSchema),
    createTask
  );
  router.get("/v1/tasks/completed", verifyToken, getCompletedTasks);
  router.get("/v1/tasks/pending", verifyToken, getPendingTasks);

  router.get(
    "/v1/tasks/all/assigned-by",
    verifyToken,
    getAllTasksAssignedByUser
  );
  router.get(
    "/v1/tasks/pending/assigned-by",
    verifyToken,
    getPendingTasksAssignedByUser
  );
  router.get(
    "/v1/tasks/completed/assigned-by",
    verifyToken,
    getCompletedTasksAssignedByUser
  );
  router.get("/v1/tasks", verifyToken, getTask);
  router.get("/v1/tasks/search/all", verifyToken, searchTask);
  router.get("/v1/tasks/:id", verifyToken, getSingleTask);
  router.put("/v1/tasks/:id", verifyToken, getEditedTasks);
  router.delete("/v1/tasks/:id", verifyToken, getDeletedTask);

  return router;
};

export default routes;
