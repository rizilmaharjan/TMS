import { resetpassword } from './../../user/controller/index';
import { Request, Response } from "express";
import { fetchAllTasksAssignedByUser, fetchCompletedTasks, fetchCompletedTasksAssignedByUser, fetchDeletedTasks, fetchEditedTasks, fetchPendingTasks, fetchPendingTasksAssignedByUser, fetchSingleTask, fetchTask, postTask, searchSpecificTask } from "../services";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { status, message } = await postTask({ ...req.body });
    return res.status(status).json({ message: message });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getTask = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const {priority, taskStatus, searchQuery } = req.query
    const searchRegex = searchQuery ? new RegExp(searchQuery as string, "i") : undefined
    
    const filters = searchRegex ? {
      title: searchRegex
    }: {} 


    const { status, message, task } = await fetchTask(user, priority as string, taskStatus as string, filters);
    return res.status(status).json({ message: message, task: task });
  } catch (error) {
    res.status(400).json(error);
  }
};
export const getCompletedTasks = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;

    const { status, message, tasks } = await fetchCompletedTasks(user);
    return res.status(status).json({ message: message, task: tasks });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPendingTasks = async(req:Request, res:Response)=>{
  try {
    const user = res.locals.user;
    const {status, message, tasks} = await fetchPendingTasks(user)
    return res.status(status).json({message: message, task: tasks})

  } catch (error) {
    
  }
}


export const getEditedTasks = async(req:Request, res:Response)=>{
  try {
    const {id} = req.params
    const {status, message, data} = await fetchEditedTasks(id,req.body) 
    return res.status(status).json({ message: message, data:data });


    
  } catch (error) {
    res.status(400).json(error);
    
  }
}

export const getDeletedTask = async(req:Request, res:Response)=>{
  try {
    const {id} = req.params
    const {status, message} = await fetchDeletedTasks(id)
    return res.status(status).json({message: message})
    
  } catch (error) {
    res.status(400).json(error)
    
  }
}


export const getSingleTask = async(req:Request, res:Response)=>{
  try {
    const {id} = req.params
    const {status,message,data} = await fetchSingleTask(id)
    return res.status(status).json({message: message, data:data})


    
  } catch (error) {
    res.status(404).json(error)
    
  }
}

export const getPendingTasksAssignedByUser = async(req:Request, res:Response) => {
  try {
    const user = res.locals.user;
    const {status, message, data} = await fetchPendingTasksAssignedByUser(user)
    return res.status(status).json({message: message, data:data})


  } catch (error) {
    res.status(404).json(error)
    
  }
}
export const getCompletedTasksAssignedByUser = async(req:Request, res:Response) => {
  try {
    const user = res.locals.user;
    const {status, message, data} = await fetchCompletedTasksAssignedByUser(user)
    return res.status(status).json({message: message, data:data})


  } catch (error) {
    res.status(404).json(error)
    
  }
}
export const getAllTasksAssignedByUser = async(req:Request, res:Response) => {
  try {
    const user = res.locals.user;
    const {status, message, data} = await fetchAllTasksAssignedByUser(user)
    return res.status(status).json({message: message, data:data})


  } catch (error) {
    res.status(404).json(error)
    
  }
}

export const searchTask = async(req:Request, res:Response)=>{
  try {
    const {q} = req.query
    const {status, message, data} = await searchSpecificTask(q as string)
    return res.status(status).json({message: message, data:data})


    
  } catch (error) {
    res.status(404).json(error)
    
  }
}
