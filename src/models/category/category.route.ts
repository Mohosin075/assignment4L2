import { Router } from "express";
import { categoryValidations } from "./category.validation";
import { CategoryController } from "./category.controller";
import ValidateRequest from "../../middleware/ValidateRequest";
import { auth } from "../../middleware/auth";

const router = Router();

router.post(
  "/",
  auth("admin"),
  ValidateRequest(categoryValidations.categorySchemaValidation),
  CategoryController.createCategory
);
router.get("/", CategoryController.getAllCreateCategory);

export const categoryRoutes = router;
