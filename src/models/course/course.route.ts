import { Router } from "express";
import { CourseControllers } from "./course.controller";
import ValidateRequest from "../../middleware/ValidateRequest";
import { CourseValidation } from "./course.validation";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth('admin'),
  ValidateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse
);
router.put(
  "/:courseId",
  auth('admin'),
  ValidateRequest(CourseValidation.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.get("/", CourseControllers.getAllCourse);
router.get("/:courseId/reviews", CourseControllers.getCourseByReviews);
router.get("/best", CourseControllers.getBestCourseByReviews);

export const courseRoute = router;
