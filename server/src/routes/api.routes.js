import { Router } from "express";
import Task from "../models/task.model.js";
const router = Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({ tasks });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.get("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id).catch(() => {});

    if (!task)
      return res.status(404).json({
        message: "Unknown task",
      });

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/new_task", async (req, res) => {
  try {
    const { title, description, done } = req.body;

    const task = await Task.create({
      title,
      description,
      done,
    });

    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, done } = req.body;

  try {
    const task = await Task.findById(id).catch(() => {});

    if (!task)
      return res.status(404).json({
        message: "Unknown task",
      });

    task.title = title;
    task.description = description;
    task.done = done;

    const updatedTask = await task.save();

    res.status(201).json(updatedTask);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.delete("/task/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id).catch(() => {});

    if (!task)
      return res.status(404).json({
        message: "Unknown task",
      });

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default router;
