import { Request, Response, Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodoById,
  updateTodo,
} from "../controllers/todoControllers";

const todoRouter = Router();

todoRouter.post("/", createTodo);
todoRouter.get("/", getTodo);
todoRouter.get("/:id", getTodoById);
todoRouter.put("/:id", updateTodo);
todoRouter.patch("/:id", updateTodo);
todoRouter.delete("/:id", deleteTodo);

export default todoRouter;
