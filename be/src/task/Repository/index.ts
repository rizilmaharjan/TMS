import { TTaskSchema } from "./../../schema/task.schema";
import { taskModel } from "../../Model/tasks.model";
import { TUser } from "../../user/Repository/user.types";
export const createTask = async (task: TTaskSchema["body"]) => {
  try {
    const { title, dueDate } = task;

    const loweredCasedTitle = title.toLowerCase();
    const existingTask = await taskModel.findOne({
      title: loweredCasedTitle,
      status: "pending",
    });
    if (existingTask) return { status: 409, message: "Task already exists" };

    task.title = loweredCasedTitle;
    const newTask = new taskModel(task);
    await newTask.save();
    return { status: 201, message: "Task created successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const getTask = async (
  user: TUser,
  priority?: string,
  status?: string,
  filters?: any
) => {
  try {
    const { username } = user;
    console.log("priority", priority);
    console.log("filters", filters);
    console.log("status", status);
    const fetchTasks = await taskModel.find({
      assignedTo: username,
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(filters ? filters : {}),
    });
    if (!fetchTasks) return { status: 404, message: "Tasks not assigned" };
    return {
      status: 200,
      message: "Tasks fetched successfully",
      task: fetchTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const getCompletedTasks = async (user: TUser) => {
  try {
    const { username } = user;
    const fetchCompletedTasks = await taskModel.find({
      assignedTo: username,
      status: "completed",
    });
    if (!fetchCompletedTasks || fetchCompletedTasks.length === 0)
      return { status: 404, message: "No Tasks has been completed" };
    return {
      status: 200,
      message: "Completed tasks fetched successfully",
      tasks: fetchCompletedTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const pendingTasks = async (user: TUser) => {
  try {
    const { username } = user;
    const fetchPendingTasks = await taskModel.find({
      assignedTo: username,
      status: "pending",
    });
    if (!fetchPendingTasks)
      return { status: 404, message: "No pending tasks are left" };
    return {
      status: 200,
      message: "Pending tasks fetched successfully",
      tasks: fetchPendingTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error"};
  }
};

export const editTask = async (
  taskId: string,
  updateTask: TTaskSchema["body"]
) => {
  try {
    const existingTask = await taskModel.findById(taskId);
    if (!existingTask) return { status: 404, message: "Task not found" };

    const editedTask = await taskModel.findOneAndUpdate(
      { _id: taskId },
      updateTask,
      { new: true }
    );
    if (!editedTask)
      return { status: 400, message: "Failed to update the task" };
    return {
      status: 200,
      message: "Task updated successfully",
      data: editedTask,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const existingTask = await taskModel.findById(taskId);
    if (!existingTask) return { status: 404, message: "Task not found" };
    const deleteTask = await taskModel.findByIdAndDelete(taskId);
    if (!deleteTask)
      return { status: 400, message: "Task could not be deleted" };
    return { status: 200, message: "Task deleted successfully" };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const getSingleTask = async (taskId: string) => {
  console.log("task id", taskId);
  try {
    console.log("i am inside try block");
    const existingTask = await taskModel.findById(taskId);
    console.log("i am inside try block 2");
    if (!existingTask) return { status: 404, message: "Task not found" };
    return {
      status: 200,
      message: "Task fetched successfully",
      data: existingTask,
    };
  } catch (error: any) {
    // console.log("fetch single task", error);
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const getPendingTasksAssignedByUser = async (user: TUser) => {
  try {
    const { username } = user;
    const pendingTasks = await taskModel.find({
      assignedBy: username,
      status: "pending",
    });
    if (!pendingTasks)
      return { status: 404, message: "Pending Tasks not found" };
    return {
      status: 200,
      message: "Tasks fetched successfully",
      data: pendingTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};
export const getCompletedTasksAssignedByUser = async (user: TUser) => {
  try {
    const { username } = user;
    const pendingTasks = await taskModel.find({
      assignedBy: username,
      status: "completed",
    });
    if (!pendingTasks)
      return { status: 404, message: "Pending Tasks not found" };
    return {
      status: 200,
      message: "Tasks fetched successfully",
      data: pendingTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};
export const getAllTasksAssignedByUser = async (user: TUser) => {
  try {
    const { username } = user;
    const pendingTasks = await taskModel.find({
      assignedBy: username,
    });
    if (!pendingTasks) return { status: 404, message: "Tasks not found" };
    return {
      status: 200,
      message: "Tasks fetched successfully",
      data: pendingTasks,
    };
  } catch (error: any) {
    throw new Error(error.message);
    // return { status: 500, message: "Internal server error" };
  }
};

export const searchTask = async (q: string) => {
  try {
    if (!q) return { status: 404, message: "Task not found" };
    const searchResults = await taskModel.find({
      title: { $regex: new RegExp(q, "i") },
    });
    if (searchResults.length === 0)
      return { status: 404, message: "Task not found", data: [] };
    return { status: 200, message: "Search result found", data: searchResults };
  } catch (error: any) {
    // return {status: 500, message: "Internal server error"}
    throw new Error(error.message);
  }
};
