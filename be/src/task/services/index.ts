import { createTask, deleteTask, editTask, getAllTasksAssignedByUser, getCompletedTasks, getCompletedTasksAssignedByUser, getPendingTasksAssignedByUser, getSingleTask, getTask, pendingTasks, searchTask } from "../Repository"
import { TTaskSchema } from "../../schema/task.schema"
import { TUser } from "../../user/Repository/user.types"

export const postTask = async(task:TTaskSchema['body'])=>{
    try {
        const response = await createTask(task)
        return response
        
    } catch (error) {
        throw new Error("Failed to create task")
        
    }
}

export const fetchTask = async(user:TUser, priority?:string, status?:string, filters?:any)=>{
    try {
        const response = await getTask(user, priority, status, filters)
        return response
    } catch (error) {
        throw new Error("Failed to fetch the tasks")
        
    }
}

export const fetchCompletedTasks = async(user:TUser)=>{
    try {
        const response = await getCompletedTasks(user)
        return response
    } catch (error) {
        throw new Error("Failed to fetch the completed tasks")
        
    }
}

export const fetchPendingTasks = async(user:TUser)=>{
    try {
        const response = await pendingTasks(user)
        return response

        
    } catch (error) {
        throw new Error("Failed to fetch the pending tasks")
        
    }
}


export const fetchEditedTasks = async(taskId:string, updateTask:TTaskSchema['body'])=>{
    try {
        const response = await editTask(taskId,updateTask)
        return response
        
    } catch (error) {
        throw new Error("Failed to edit the task")
        
    }
}

export const fetchDeletedTasks = async(taskId:string)=>{
    try {
        const response = await deleteTask(taskId)
        return response
        
    } catch (error) {
        throw new Error("Failed to delete the task")
        
    }
}


export const fetchSingleTask = async(taskId:string)=>{
    try {
        const response = await getSingleTask(taskId)
        return response
        
    } catch (error) {
        throw new Error("Failed to fetch the single task")
        
    }
}

export const fetchPendingTasksAssignedByUser = async(user:TUser)=>{
    try {
        const response = await getPendingTasksAssignedByUser(user)
        return response
        
    } catch (error) {
        throw new Error("Failed to fetch the pending tasks")
        
    }
}
export const fetchCompletedTasksAssignedByUser = async(user:TUser)=>{
    try {
        const response = await getCompletedTasksAssignedByUser(user)
        return response
        
    } catch (error) {
        throw new Error("Failed to fetch the pending tasks")
        
    }
}
export const fetchAllTasksAssignedByUser = async(user:TUser)=>{
    try {
        const response = await getAllTasksAssignedByUser(user)
        return response
        
    } catch (error) {
        throw new Error("Failed to fetch the pending tasks")
        
    }
}

export const searchSpecificTask = async(q:string)=>{
    try {
        const response = await searchTask(q)
        return response
        
    } catch (error) {
        throw new Error("Failed to search for task")
        
    }
}