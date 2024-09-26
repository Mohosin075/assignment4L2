import { NextFunction, Request, RequestHandler, Response } from "express";
import { courseServices } from "./course.services";
import SendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createCourse = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  SendResponse(res, {
    statusCode: 200,
    message: "Course created successfully",
    success: true,
    data: result,
  });
});

const getAllCourse = catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseServices.getAllCourseFromDB(req.query);


    SendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Courses retrieved successfully",
      meta : result?.meta,
      data: result.result,
    });
  }
);

const updateCourse = catchAsync(async(req: Request, res: Response) =>{
  const {courseId} = req.params
  const result = await courseServices.updateCourseIntoDB(courseId, req.body)
  
  SendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course update successfully",
    data: result,
  });
})

const getCourseByReviews= catchAsync(
  async (req: Request, res: Response) => {
    const {courseId} = req.params
    const result = await courseServices.getCourseByReviewsFromDB(courseId)

    SendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Course and Reviews retrieved successfully",
      data: { course : result?.course, reviews : result?.reviews},
    });
  }
);


const getBestCourseByReviews= catchAsync(
  async (req: Request, res: Response) => {
    const result = await courseServices.getBestCourseByReviewsFromDB()

    SendResponse(res, {
      statusCode: 200,
      success: true,
      message: "best course retrieved successfully",
      data: result,
    });
  }
);

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getCourseByReviews,
  getBestCourseByReviews,
  updateCourse
};
