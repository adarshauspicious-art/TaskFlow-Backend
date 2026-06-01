import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/auth-controllers.js";

import authMiddleware from "../middleware/auth-middleware.js";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


export default router;