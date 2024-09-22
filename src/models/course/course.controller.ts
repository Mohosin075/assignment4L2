import { RequestHandler } from "express";
import { courseServices } from "./course.services";
import { CourseValidation } from "./course.validation";

const createCourse: RequestHandler = async (req, res, next) => {
  try {
   
    const result = await courseServices.createCourseIntoDB(req.body);

    res.json({ 
      success: true,
      statusCode: 201,
      message: "Course created successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      statusCode: 201,
      message: "something went wrong",
      error: error,
    });
  }
};

export const CourseControllers = {
  createCourse,
};
