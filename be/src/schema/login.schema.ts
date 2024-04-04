import {z} from "zod"

export const LoginSchema = z.object({
    body: z.object({
        email: z.string().trim().min(1,{message: "Email is required"}).email({message: "Invalid email address"}),
        password: z.string().trim().min(1,{message: "Password is required"})
    })
})

// extracting the type
export type TLoginSchema = z.infer<typeof LoginSchema>