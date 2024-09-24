import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  try {
    const result = await Course.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllCourseFromDB = async()=>{
  const result = await Course.find().populate('categoryId');
  return result
}

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB
};
