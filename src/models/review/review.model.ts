import mongoose, { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>({
    courseId : {
        type : Schema.Types.ObjectId,
        ref : 'Course',
        required : true
    },
    rating : {
        type : Number,
        required : true,
        max : 5,
        min : 1
    },
    review : {
        type : String,
        required : true
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
});

export const Review = model<TReview>('Review', ReviewSchema);
