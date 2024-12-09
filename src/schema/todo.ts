import z from "zod";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["Done", "In Progress"]),
});

export interface Todo {
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
