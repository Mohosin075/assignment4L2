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
    const result = await courseServices.getAllCourseFromDB();
    SendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Courses retrieved successfully",
      data: result,
    });
  }
);

export const CourseControllers = {
  createCourse,
  getAllCourse,
};
