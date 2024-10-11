import { Router } from "express";
import { UserValidations } from "./auth.validation";
import ValidateRequest from "../../middleware/ValidateRequest";
import { AuthControllers } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { USER_ROLE } from "./auth.constant";

const router = Router();

router.post(
  "/register",
  ValidateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.createUser
);


router.post(
  "/login",
  ValidateRequest(UserValidations.loginUserValidationSchema),
  AuthControllers.loginUser
);

router.post(
  "/change-password",
  auth('user', 'admin'),
  ValidateRequest(UserValidations.changePasswordValidationSchema),
  AuthControllers.changePassword
);


export const AuthRoutes = router;
