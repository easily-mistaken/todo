import { Request, Response } from "express";
import mongoose from "mongoose";
import { z } from "zod";

import { todoSchema } from "../schema/todo";
import { Todo } from "../models/todo.model";

export const createTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Validate request body
    const { title, description, status } = todoSchema.parse(req.body);

    // Create and save the new Todo
    const newTodo = await Todo.create({ title, description, status });
    res
      .status(201)
      .json({ message: "Todo created successfully!", todo: newTodo });
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      res.status(400).json({
        message: "Validation error",
        errors: error.errors,
      });
      return;
    }
    console.error(error);
    res.status(500).json({
      message: "Oops! Something went wrong.",
    });
    return;
  }
};

export const getTodo = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const todos = await Todo.find().skip(skip).limit(limit);

    res.status(200).json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oops! Something broke" });
    return;
  }
};

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const { idOrTitle } = req.params;
    let todos;

    if (!mongoose.Types.ObjectId.isValid(idOrTitle)) {
      todos = await Todo.findById(idOrTitle);
    } else {
      todos = await Todo.find({ title: idOrTitle });
    }

    if (!todos || (Array.isArray(todos) && todos.length === 0)) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(todos);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oops! Something broke" });
    return;
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = todoSchema.parse(req.body);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }

    let todo = await Todo.findByIdAndUpdate(id, { title, description, status });

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo updated successfully!", todo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Oops! Something broke" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Oops! Something broke" });
    return;
  }
};
