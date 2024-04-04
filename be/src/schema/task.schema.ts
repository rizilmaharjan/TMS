import { z } from "zod";

export const TaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, { message: "This field cannot be empty" }),
    description: z.array(
      z.object({
        step: z
          .string()
          .trim()
          .min(1, { message: "This field cannot be empty" }),
      })
    ),
    priority: z.string().min(1, { message: "This field cannot be empty" }),
    status: z.string().min(1, { message: "This field cannot be empty" }),
    dueDate: z.coerce.date(),
    assignedBy: z
      .string()
      .trim()
      .min(1, { message: "This field cannot be empty" }),
    assignedTo: z
      .string()
      .trim()
      .min(1, { message: "This field cannot be empty" }),
  }),
});

// extracting the type
export type TTaskSchema = z.infer<typeof TaskSchema>;
