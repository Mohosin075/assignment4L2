import { Router } from "express";
import ValidateRequest from "../../middleware/ValidateRequest";
import { ReviewValidation } from "./review.validation";
import { reviewController } from "./review.controller";

const router = Router();

router.post('/reviews', ValidateRequest(ReviewValidation.createReviewSchemaValidation), reviewController.createReview);

router.get('/reviews',  reviewController.getAllReview);


export const ReviewRoutes = router;