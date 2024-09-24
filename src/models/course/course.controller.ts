import { RequestHandler } from "express";
import { courseServices } from "./course.services";
import { CourseValidation } from "./course.validation";
import SendResponse from "../../utis/sendResponse";

const createCourse: RequestHandler = async (req, res, next) => {
  try {
    const result = await courseServices.createCourseIntoDB(req.body);

    SendResponse(res, {
      statusCode : 200,
      message : 'Course created successfully',
      success : true,
      data : result
    })

    // res.json({ 
    //   success: true,
    //   statusCode: 201,
    //   message: "Course created successfully",
    //   data: result,
    // });
  }catch(error) {
    next(error)
  }
};

const getAllCourse : RequestHandler = async(req, res, next) =>{
  try {
    const result = await courseServices.getAllCourseFromDB();
    
    SendResponse(res, {
      statusCode : 200,
      success: true,
      message : 'Courses retrieved successfully',
      data : result
    })
  }catch(error) {
    next(error)
  }

}

export const CourseControllers = {
  createCourse,
  getAllCourse
};
