import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
import { User } from "../auth/auth.model";

const createCategoryIntoDB = async(userData :JwtPayload, payload : TCategory) =>{

    
    payload.createdBy = userData?._id


    const result  = await Category.create(payload);

    return result
};
const getAllCategoryFromDB = async() =>{
    const result  = await Category.find().populate('createdBy');

    return result
};

export const categoryServices = {
    createCategoryIntoDB,
    getAllCategoryFromDB
}