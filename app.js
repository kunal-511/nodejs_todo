import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";
dotenv.config({
  path: "./data/config.env",
});
export const app = express();

app.use(express.json());
app.use(cookieParser());
//importing routes
//app.use("api/v1/users", userRouter);
app.use("/users", userRouter); // user router
app.use("/task", taskRouter); // task router
// CORS Middleware

app.options("*", cors());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Nice Working");
});

// Using error middleware
app.use(errorMiddleware);
