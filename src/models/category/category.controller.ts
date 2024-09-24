import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import { categoryServices } from "./category.services";
import SendResponse from "../../utils/sendResponse";

const createCategory =catchAsync(async(req, res, next)=>{
    const result = await categoryServices.createCategoryIntoDB(req.body);

    SendResponse(res, {
        success: true,
        statusCode : 200,
        message : 'Category date created successfully.',
        data : result
    })
});

const getAllCreateCategory =catchAsync(async(req, res, next)=>{
    const result = await categoryServices.getAllCategoryFromDB();

    SendResponse(res, {
        success: true,
        statusCode : 200,
        message : 'Category retrieved successfully.',
        data : result
    })
});

export const CategoryController = {
    createCategory,
    getAllCreateCategory
}