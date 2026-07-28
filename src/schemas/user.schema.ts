import { z } from "zod";
import { UserRole } from '../constants/user-roles';

export const UserSchema = z.object({
  id: z.string(),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string().min(9, { message: "Phone must be at least 9 characters long" }),
  createdAt: z.iso.datetime(),
  role: z.enum(UserRole),
});

export const CreateUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  phone: z.string().min(9, { message: "Phone must be at least 9 characters long" }),
  role: z.enum(UserRole),
});

export const LoginUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export const UpdateUserSchema = z.object({
  email: z.email({ message: "Invalid email address" }).optional(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).optional(),
  phone: z.string().min(9, { message: "Phone must be at least 9 characters long" }).optional(),
  role: z.enum(UserRole).optional(),
});

export type User = z.infer<typeof UserSchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
