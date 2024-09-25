import { z } from "zod";

const createReviewSchemaValidation = z.object({
    courseId : z.string({invalid_type_error : 'courseId must be a object Id'}),
    rating : z.number({invalid_type_error : 'rating must be a number'}).max(5).min(1),
    review : z.string({invalid_type_error : 'review must be a string'})
})

export const ReviewValidation = {
    createReviewSchemaValidation
}