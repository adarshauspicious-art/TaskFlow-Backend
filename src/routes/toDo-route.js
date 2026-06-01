import express from "express";
import authMiddleware from "../middleware/auth-middleware.js";
import {
  createToDo,
  getToDos,
  toggleToDo,
  deleteToDo,
  getCurrentUser
} from "../controllers/toDo-controllers.js";

const router = express.Router();

router.post("/", authMiddleware, createToDo);
router.get("/me", authMiddleware, getCurrentUser);
router.get("/", authMiddleware, getToDos);
router.patch("/:id", authMiddleware, toggleToDo);
router.delete("/:id", authMiddleware, deleteToDo);

export default router;  