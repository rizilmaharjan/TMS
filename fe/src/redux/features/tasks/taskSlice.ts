import {createSlice} from "@reduxjs/toolkit"
import { TaskSchema } from "../../../Model/task.schema"

type TaskState = {
    tasks: TaskSchema[]
}
const initialState: TaskState={
    tasks: []
}
const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers:{
        setTasks: (state, action)=>{
            state.tasks = action.payload
        }
    }
})

export const {setTasks} = taskSlice.actions;
export default taskSlice.reducer;