import express from "express";
import { createTask, delteTask, updateTask,  getMyTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated,createTask)
router.get("/my", isAuthenticated, getMyTask)
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated, delteTask)

export default router