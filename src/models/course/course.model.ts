import { model, Schema } from "mongoose";
import { TCourse, TDetails, TTags } from "./course.interface";

const tagsSchema = new Schema<TTags>({
  name : {type : String, required : true},
  isDeleted : {type : Boolean, default : false}
});

const detailsSchema = new Schema<TDetails>({
  level : {type : String, enum : ['Beginner', 'Intermediate', 'Advanced'], required : true},
  description : {type : String, required : true},
})


const courseSchema = new Schema<TCourse>({
  title : {type : String, required: true, unique : true},
  categoryId : {
    type : Schema.Types.ObjectId, 
    ref : 'Category'
  },
  instructor : {type : String, required: true},
  price : {type : Number, required: true},
  language : {type : String, required: true},
  provider : {type : String, required: true},
  startDate : {type : String, required : true},
  endDate : {type : String, required : true},
  tags : [tagsSchema],
  details : detailsSchema
})

export const Course = model<TCourse>('Course', courseSchema);