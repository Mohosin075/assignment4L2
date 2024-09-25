import { Query, startSession, Types } from "mongoose";
import { Review } from "../review/review.model";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createCourseIntoDB = async (payload: TCourse) => {
  try {
    const result = await Course.create(payload);
    return result;
  } catch (error) {
    throw error;
  }
};




const getAllCourseFromDB = async (query : Record<string, unknown>) => {
  // const result = await Course.find().populate("categoryId");

  const coursesQuery = new QueryBuilder(Course.find(), query).filter().sort()
  

  // console.log(query);

  const result = await coursesQuery.modelQuery.exec()

  // console.log(result);
 
  return result;
};










const getCourseByReviewsFromDB = async (courseId: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const course = await Course.findOne({
      _id: new Types.ObjectId(courseId),
    }).session(session);
    if (!course) {
      throw new Error("Course not found");
    }

    const reviews = await Review.find({ courseId }).session(session);

    if (!reviews) {
      throw new Error("Review not found");
    }

    await session.commitTransaction();
    await session.endSession();
    return { course, reviews };
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }
};

const getBestCourseByReviewsFromDB = async () => {
  const courses = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        averageRating: { $avg: "$rating" },
        totalRating: { $sum: "$rating" },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
  ]);

  const bestCourseById = courses && courses[0];

  const course = await Course.findById(bestCourseById._id);

  const { averageRating, totalRating } = bestCourseById;

  return { course, averageRating, totalRating };
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getCourseByReviewsFromDB,
  getBestCourseByReviewsFromDB,
};
