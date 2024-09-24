import { Router } from "express";
import { categoryValidations } from "./category.validation";
import { CategoryController } from "./category.controller";
import ValidateRequest from "../../middleware/ValidateRequest";

const router = Router();

router.post('/category', ValidateRequest(categoryValidations.categorySchemaValidation), CategoryController.createCategory);
router.get('/category', CategoryController.getAllCreateCategory);


export const categoryRoutes = router