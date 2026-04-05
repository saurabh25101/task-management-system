 import { Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ================= GET TASKS =================
export const getTasks = async (req: any, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: tasks });
  } catch {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
};

// ================= CREATE TASK =================
export const createTask = async (req: any, res: Response) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title required" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: status || "pending", // 

 FIX
        userId: req.userId,
      },
    });

    res.json({ success: true, data: task });
  } catch {
    res.status(500).json({ success: false, message: "Create failed" });
  }
};

// ================= UPDATE TASK (🔥 NEW ADD) =================
export const updateTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
      },
    });

    res.json({ success: true, data: updatedTask });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// ================= DELETE TASK =================
export const deleteTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

// ================= TOGGLE TASK =================
export const toggleTask = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    const updated = await prisma.task.update({
      where: { id },
      data: {
        status:
          task?.status === "completed" ? "pending" : "completed",
      },
    });

    res.json({ success: true, data: updated });
  } catch {
    res.status(500).json({ success: false, message: "Toggle failed" });
  }
};