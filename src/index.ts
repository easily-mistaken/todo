import express from "express";
import dotenv from "dotenv";

import appRouter from "./router/appRouter";
import connectDB from "./db/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middlewares
app.use(express.json());

// Routes
app.use("/api", appRouter);

app.listen(port, () => console.log("Server listening at port: ", port));
