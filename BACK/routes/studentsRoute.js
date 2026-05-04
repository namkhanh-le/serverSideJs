import express from "express";
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  signup,
  login,
} from "../controllers/studentsController.js";
import { authCheck } from "../middleware/auth-middleware.js";

const studentRouter = express.Router();

// Public routes
studentRouter.post("/signup", signup);
studentRouter.post("/login", login);

// Protected routes
studentRouter.get("/", authCheck, getAllStudents);
studentRouter.get("/:id", authCheck, getStudentById);
studentRouter.post("/", authCheck, createStudent);
studentRouter.put("/:id", authCheck, updateStudent);
studentRouter.delete("/:id", authCheck, deleteStudent);

export default studentRouter;
