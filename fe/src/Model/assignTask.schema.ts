import { z } from "zod";

export const TaskSchema = z.object({
  // _id: z.string(),
  title: z.string().trim().min(1, { message: "This field cannot be empty" }),
  description: z.array(
    z.object({
      step: z.string().trim().min(1, { message: "This field cannot be empty" })
      
    })
  ),
  priority: z.string().min(1, { message: "This field cannot be empty" }),
  status: z.string().min(1, { message: "This field cannot be empty" }),
  dueDate: z.string().min(1,{ message: "Due date is required" }).superRefine(
    (dateString, ctx)=>{
      const parsedData = new Date(dateString);
      if(parsedData.getTime() <= Date.now()){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Due date must be in future"
        })
      }
    }
  ) ,
    assignedBy: z
    .string()
    .trim()
    .min(1, { message: "This field cannot be empty" }),
  assignedTo: z
    .string()
    .trim()
    .min(1, { message: "This field cannot be empty" }),
    // createdAt: z.coerce.date(),

});

// extracting the type
export type TTaskSchema = z.infer<typeof TaskSchema>;
