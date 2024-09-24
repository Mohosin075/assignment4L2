import { NextFunction, Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { ReviewServices } from "./review.services";

const createReview = catchAsync(async(req : Request, res : Response, next : NextFunction) =>{
    const result = await ReviewServices.createReviewIntoDB(req.body)

    SendResponse(res, {
        success : true,
        statusCode : 200,
        message : "Review created successfully.",
        data : result
    })
});

const getAllReview = catchAsync(async(req : Request, res : Response, next : NextFunction) =>{
    const result = await ReviewServices.getAllReviewFromDB()

    SendResponse(res, {
        success : true,
        statusCode : 200,
        message : "Review retrieved successfully.",
        data : result
    })
});

export const reviewController = {
    createReview,
    getAllReview
}