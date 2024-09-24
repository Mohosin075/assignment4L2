import { Router } from "express";
import { CourseControllers } from "./course.controller";
import ValidateRequest from "../../middleware/ValidateRequest";
import { CourseValidation } from "./course.validation";

const router =  Router()

router.post('/courses', ValidateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourse);

router.get('/courses', CourseControllers.getAllCourse);
router.get('/courses/:courseId/reviews', CourseControllers.getCourseByReviews);
router.get('/course/best', CourseControllers.getBestCourseByReviews);

export const courseRoute = router