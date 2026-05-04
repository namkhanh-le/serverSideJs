import {
  findAllCourses,
  findCourseById,
  createCourseService,
  updateCourseService,
  deleteCourseService,
} from "../services/courseService.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await findAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await findCourseById(id);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ message: "Course not found" });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await updateCourseService(id, req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteCourseService(id);
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
