import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
import { User } from "../auth/auth.model";

const createCategoryIntoDB = async(userData :JwtPayload, payload : TCategory) =>{

    const user = await User.findOne({email : userData?.email});

    if(!user){
        throw new Error('User not found!')
    }

    
    payload.createdBy = user?._id

    console.log(user, payload);

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