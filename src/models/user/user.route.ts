import { Router } from "express";
import { userController } from "./user.controller";

const route =  Router()

route.post('/users', userController.createUser);

export const UserRoute = route