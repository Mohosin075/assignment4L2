import { z } from "zod";
import { USER_ROLE } from "./auth.constant";

const createUserValidationSchema = z.object({
  username: z.string({ invalid_type_error: "username should be a string!" }),
  email: z
    .string({ invalid_type_error: "Email should be a string!" })
    .email({ message: "Invalid email address!" }),
  password: z
    .string({ invalid_type_error: "Password should be a string!" })
    .min(8, { message: "Password must be at least 8 characters long!" })
    .regex(/[a-z]/, {
      message: "Password must include at least one lowercase letter!",
    })
    .regex(/[A-Z]/, {
      message: "Password must include at least one uppercase letter!",
    })
    .regex(/\d/, { message: "Password must include at least one number!" })
    .regex(/[@$!%*?&#]/, {
      message:
        "Password must include at least one special character (@, $, !, %, *, ?, &, #)!",
    }),
  role: z
    .enum([...USER_ROLE], {
      invalid_type_error: 'Role must be either "user" or "admin"!',
    })
    .default("user"),
});

export const UserValidations = {
  createUserValidationSchema,
};
