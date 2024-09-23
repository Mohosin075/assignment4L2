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
  }catch(error) {
    next(error)
  }
};
try{

}catch(err){

}

export const CourseControllers = {
  createCourse,
};
