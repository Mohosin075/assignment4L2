import { startSession } from "mongoose";
import { Course } from "../course/course.model";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../auth/auth.model";

const createReviewIntoDB = async(userData : JwtPayload, payload : TReview)=>{

    const {courseId} = payload;

    const session = await startSession();
    try {
        session.startTransaction();

        const course = await Course.findOne({_id : courseId}).session(session);

    if(!course){
        throw new Error('Course not found')
    }

    const user = await User.findOne({email : userData?.email})


    payload.createdBy = user?._id

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
    const result = await Review.find().populate('createdBy')
    // .populate('courseId');
    return result
};

export const ReviewServices = {
    createReviewIntoDB,
    getAllReviewFromDB
}