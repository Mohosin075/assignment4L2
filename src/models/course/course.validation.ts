import { Types } from "mongoose";
import { z } from "zod";

const tagsValidationSchema = z.object({
  name: z.string({ message: "Tag Name is required" }),
  isDeleted: z.boolean().optional(),
});

const detailsSchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  description: z.string({ message: "Description is required" }),
});

const createCourseValidationSchema = z.object({
  title: z.string({ message: "Title is required" }),
  categoryId : z.string(),
  instructor: z.string({ message: "Instructor is required" }),
  price: z.number({ message: "Price is required" }),
  language: z.string({ message: "Language is required" }),
  provider: z.string({ message: "Provider is required" }),
  startDate: z.string().date(),
  endDate: z.string().date(),
  tags: z.array(tagsValidationSchema),
  details: detailsSchema,
});

export const CourseValidation = {
  createCourseValidationSchema,
};
