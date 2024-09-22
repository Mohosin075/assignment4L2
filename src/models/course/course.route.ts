import { Router } from "express";
import { CourseControllers } from "./course.controller";
import ValidateRequest from "../../middleware/ValidateRequest";
import { CourseValidation } from "./course.validation";

const router =  Router()

router.post('/course', ValidateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourse);

export const courseRoute = router