import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const LoginSchema = z.object({
  email: z.email("Eamil is required"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterCredentials = z.infer<typeof RegisterSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
