import { startSession } from "mongoose";
import { Course } from "../course/course.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";

const createReviewIntoDB = async(payload : TReview)=>{

    const {courseId} = payload;

    const session = await startSession();
    try {
        session.startTransaction();

        const course = await Course.findOne({_id : courseId}).session(session);

    if(!course){
        throw new Error('Course not found')
    }

    const result = await Review.create([payload], {session});

    await session.commitTransaction();
    await session.endSession();
    return result
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();

        throw err
    }
};

const getAllReviewFromDB = async()=>{
    const result = await Review.find().populate('courseId');
    return result
};

export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewFromDB
}