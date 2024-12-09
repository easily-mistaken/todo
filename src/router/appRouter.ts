import { Router } from "express";
import todoRouter from "./todoRouter";

const appRouter = Router();

appRouter.use("/todo", todoRouter);

export default appRouter;
