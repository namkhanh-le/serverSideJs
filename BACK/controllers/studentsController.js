import {
  findAllStudents,
  findStudentById,
  createStudentService,
  updateStudentService,
  deleteStudentService,
} from "../services/studentServiceMongoDB.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await findAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await findStudentById(id);
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ message: "Student not found" });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, email, password, gpa, major } = req.body;
    const student = await createStudentService({ name, email, password, gpa, major });
    res.status(201).json({ message: "Student created successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await updateStudentService(id, req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteStudentService(id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, gpa, major } = req.body;
    const student = await createStudentService({ name, email, password, gpa, major });
    res.status(201).json({ message: "Signup successful", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
