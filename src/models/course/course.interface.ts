import { Types } from "mongoose";


export type TTags = {
    name : string;
    isDeleted ?: boolean
}

export type TDetails ={
    level : 'Beginner' | 'Intermediate' | 'Advanced';
    description : string
}

export type TCourse = {
    title : string;
    categoryId : Types.ObjectId;
    instructor : string;
    price : number;
    language : string;
    provider : string;
    startDate : string;
    endDate : string;
    tags : TTags[];
    details : TDetails

}