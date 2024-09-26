
import { z } from "zod";

const tagsValidationSchema = z.object({
  name: z.string({ invalid_type_error : 'name should be string!' }),
  isDeleted: z.boolean({ invalid_type_error : 'isDeleted should be boolean!' }).optional(),
});

const detailsSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string({ invalid_type_error : 'description should be string!' }),
});

const createCourseValidationSchema = z.object({
  title: z.string({ invalid_type_error : 'title should be string!' }),
  categoryId : z.string(),
  instructor: z.string({ invalid_type_error : 'title should be string!' }),
  price: z.number({ invalid_type_error : 'Price should be number!' }),
  language: z.string({ invalid_type_error : 'language should be string!' }),
  provider: z.string({ invalid_type_error : 'provider should be string!' }),
  startDate: z.string().date('Invalid date format. Please use YYYY-MM-DD'),
  endDate: z.string().date('Invalid date format. Please use YYYY-MM-DD'),
  tags: z.array(tagsValidationSchema),
  details: detailsSchema,
});


const updateTagsValidationSchema = z.object({
  name: z.string({ invalid_type_error : 'name should be string!' }).optional(),
  isDeleted: z.boolean({ invalid_type_error : 'isDeleted should be boolean!' }).optional(),
});

const updateDetailsSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  description: z.string({ invalid_type_error : 'description should be string!' }).optional(),
});

const updateCourseValidationSchema = z.object({
  title: z.string({ invalid_type_error : 'title should be string!' }).optional(),
  categoryId : z.string().optional(),
  instructor: z.string({ invalid_type_error : 'title should be string!' }).optional(),
  price: z.number({ invalid_type_error : 'Price should be number!' }).optional(),
  language: z.string({ invalid_type_error : 'language should be string!' }).optional(),
  provider: z.string({ invalid_type_error : 'provider should be string!' }).optional(),
  startDate: z.string().date('Invalid date format. Please use YYYY-MM-DD').optional(),
  endDate: z.string().date('Invalid date format. Please use YYYY-MM-DD').optional(),
  tags: z.array(updateTagsValidationSchema).optional(),
  details: updateDetailsSchema.optional(),
});

export const CourseValidation = {
  createCourseValidationSchema,
  updateCourseValidationSchema
};
