import User from "../models/userModel.js";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const findAllStudents = () => {
  return User.find({});
};

export const findStudentById = (id) => {
  return User.findById(id);
};

export const deleteStudentService = (id) => {
  return User.findByIdAndDelete(id);
};

export const createStudentService = async (newStudent) => {
  const hashedPassword = await bcrypt.hash(newStudent.password, SALT_ROUNDS);
  return User.create({ ...newStudent, password: hashedPassword });
};

export const updateStudentService = async (id, newStudent) => {
  if (newStudent.password) {
    newStudent.password = await bcrypt.hash(newStudent.password, SALT_ROUNDS);
  }
  return User.findByIdAndUpdate(id, newStudent);
};
