 import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
  toggleTask,
} from "../controllers/task.controller";

import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.delete("/:id", authMiddleware, deleteTask);
router.patch("/:id/toggle", authMiddleware, toggleTask);

export default router;