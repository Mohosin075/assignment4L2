import { Router } from "express";
import ValidateRequest from "../../middleware/ValidateRequest";
import { ReviewValidation } from "./review.validation";
import { reviewController } from "./review.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth("user"),
  ValidateRequest(ReviewValidation.createReviewSchemaValidation),
  reviewController.createReview
);

router.get("/", reviewController.getAllReview);

export const ReviewRoutes = router;
