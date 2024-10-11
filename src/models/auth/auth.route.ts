import { Router } from "express";
import { UserValidations } from "./auth.validation";
import ValidateRequest from "../../middleware/ValidateRequest";
import { AuthControllers } from "./auth.controller";

const router = Router();

router.post(
  "/register",
  ValidateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createUser
);


export const AuthRoutes = router;
