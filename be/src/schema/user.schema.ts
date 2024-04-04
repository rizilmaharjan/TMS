import {z} from "zod"

export const RegisterSchema = z.object({
    body:  z.object({
        fullname: z.string().min(1,{message: "This field cannot be empty"}),
        username: z.string().min(1,{message: "This field cannot be empty"}).refine((value)=>/^[a-zA-Z][a-zA-Z0-9_]{2,}$/.test(value), {message:"Invalid username"}
        
        ),
        email: z.string().min(1,{message: "This field cannot be empty"}).email("Invalid email"),
        phone: z.number().min(10,{message: "Number should be 10 digits"}),
        password: z.string().min(5,{message: "Password should be atleast 5 characters"}).refine((value)=>/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{5,}$/.test(value),{message: "atleast one special character required"}
        ),
        confirmPassword: z.string().min(1, {message: "This field cannot be empty"})
    
    }).refine((value)=>value.password === value.confirmPassword, {
        path: ["confirmPassword"],
        message: "Password dont match"
    })
})

// extracting the type
export type TRegisterSchema = z.infer<typeof RegisterSchema>