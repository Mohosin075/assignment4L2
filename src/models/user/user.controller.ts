import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import UserSchemaValidation from "./user.validation";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;

    const validateData = UserSchemaValidation.parse(userData)

    const result = await userServices.createUserIntoDB(validateData);

    res.json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err) {
    res.json({
      success: false,
      message: "something went wrong!",
      error: err,
    });
  }
};

export const userController = {
  createUser,
};
