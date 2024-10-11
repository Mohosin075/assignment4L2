import { Query, startSession, Types } from "mongoose";
import { Review } from "../review/review.model";
import { TCourse, TMeta } from "./course.interface";
import { Course } from "./course.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../auth/auth.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const coursesQuery = new QueryBuilder(
    Course.find().populate("createdBy"),
    query
  )
    .filter()
    .sort()
    .paginate();

  const result = await coursesQuery.modelQuery.exec();

  const meta: TMeta = {
    limit: Number(query?.limit),
    page: Number(query?.page),
    total: result?.length ? result?.length : 0,
  };

  return { meta, result };
};

const updateCourseIntoDB = async (
  userData: JwtPayload,
  id: string,
  payload: Partial<TCourse>
) => {

  const course = await Course.findById(id);

  if(!course){
    throw new Error('Course not found!')
  }


  payload.createdBy = userData?._id;

  const { tags, details, ...remainingCourseData } = payload;

  const modifiedData: Record<string, unknown> = {
    ...remainingCourseData,
  };
  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  if (tags && tags?.length > 0) {
    const deleteTags = tags
      ?.filter((el) => el.isDeleted)
      .map((tag) => tag.name);
    const deletedTags = await Course.findByIdAndUpdate(
      id,
      {
        $pull: { tags: { name: { $in: deleteTags } } },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!deletedTags) {
      throw new Error("failed to update tags!");
    }

    const newTags = tags.filter((el) => !el.isDeleted);

    const addNewTags = await Course.findByIdAndUpdate(
      id,
      {
        $addToSet: { tags: { $each: newTags } },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  const result = await Course.findByIdAndUpdate(id, modifiedData, {
    new: true,
    runValidators : true
  });

  console.log(result);

  return result;
};

const getCourseByReviewsFromDB = async (courseId: string) => {
  const session = await startSession();
  try {
    session.startTransaction();
    const course = await Course.findOne({
      _id: new Types.ObjectId(courseId),
    }).populate('createdBy').session(session);
    if (!course) {
      throw new Error("Course not found");
    }

    const reviews = await Review.find({ courseId }).populate('createdBy').session(session);

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

  const course = await Course.findById(bestCourseById._id).populate('createdBy');

  const { averageRating, totalRating } = bestCourseById;

  return { course, averageRating, totalRating };
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getCourseByReviewsFromDB,
  getBestCourseByReviewsFromDB,
  updateCourseIntoDB,
};
