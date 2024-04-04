import { z } from "zod";

export const UserProfileSchema = z.object({
  fullname: z.string().trim().min(1, { message: "This field cannot be empty" }),
  username: z
    .string()
    .trim()
    .min(1, { message: "This field cannot be empty" })
    .refine((value) => /^[a-zA-Z][a-zA-Z0-9_]{2,}$/.test(value), {
      message: "Invalid username",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "This field cannot be empty" })
    .email("Invalid email"),
  phone: z.number().min(10, { message: "Number should be 10 digits" }),
  address: z.string().trim().min(1, { message: "This field cannot be empty" }),
  gender: z.string().trim().min(1, { message: "This field cannot be empty" }),
  position: z.string().trim().min(1, { message: "This field cannot be empty" }),
});

// extracting the type
export type TUserProfileSchema = z.infer<typeof UserProfileSchema>;
