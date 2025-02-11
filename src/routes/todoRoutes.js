import express from "express";
import db from "../db.js";
import prisma from "../prismaClient.js";

const router = express.Router();

router.get("/", async (req, res) => {
  // const getTodos = db.prepare("SELECT * FROM todos WHERE user_id = ?");
  // const todos = getTodos.all(req.userId);
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId,
    },
  });
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { task } = req.body;
  console.log(task);
  // const insertTodo = db.prepare(
  //   `INSERT INTO todos (user_id, task) VALUES (?, ?)`
  // );
  // const result = insertTodo.run(req.userId, task);
  const todo = await prisma.todo.create({
    data: {
      userId: req.userId,
      task,
    },
  });

  res.json(todo);
});

router.put("/:id", async (req, res) => {
  const { completed } = req.body;
  const { id } = req.params;
  // const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id = ?`);
  // updatedTodo.run(completed, id);
  const updatedTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
    data: {
      completed: !!completed,
    },
  });
  res.json(updatedTodo);
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  // const deleteTodo = db.prepare("DELETE FROM todos WHERE id =?");
  // deleteTodo.run(id);
  await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId: req.userId,
    },
  });

  res.json({
    message: "Successfully deleted",
  });
});

export default router;
