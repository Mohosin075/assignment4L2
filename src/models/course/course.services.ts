import { startSession, Types } from "mongoose";
import { Review } from "../review/review.model";
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

const getAllCourseFromDB = async () => {
  const result = await Course.find().populate("categoryId");
  return result;
};

const getCourseByReviewsFromDB = async (courseId: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const course = await Course.findOne({ _id: new Types.ObjectId(courseId)}).session(session);
    if (!course) {
      throw new Error('Course not found');
    }

    const reviews = await Review.find({ courseId }).session(session);

    if (!reviews) {
      throw new Error('Review not found');
    }
    
    await session.commitTransaction();
    await session.endSession()
    return { course, reviews };
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err
  }
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getCourseByReviewsFromDB,
};
