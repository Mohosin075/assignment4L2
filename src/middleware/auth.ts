import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../models/auth/auth.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload }  from 'jsonwebtoken';
import config from "../app/config";
import { User } from "../models/auth/auth.model";

export const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;


    if (!token) {
      throw new Error("Unauthorized!");
    }

    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    const {email, role} = decoded

    const userIsExist = await User.findOne({email});

    if(!userIsExist){
        throw new Error('User not found!')
    }

    if(requiredRole && !requiredRole.includes(role)){
        throw new Error('Unauthorized!')
    }

    req.user = decoded as JwtPayload
    
    next();
  });
};
