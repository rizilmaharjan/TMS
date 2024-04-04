import mongoose from "mongoose";
const {Schema} = mongoose;

const descriptionSchema = new Schema({
    step: {
      type: String,
      required: true,
    },
  });
const taskSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:[descriptionSchema],
    priority:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    assignedBy:{
        type: String,
        required: true,

    },
    assignedTo:{
        type: String,
        required: true,

    },
    
    dueDate:{
        type: Date,
        required: true,

    },

    createdAt:{
        type: Date,
        default: ()=>Date.now()
    }
})


// task model
export const taskModel = mongoose.model("task", taskSchema)
