import mongoose, { Schema } from "mongoose";
import { TAddress, TFullName, TUser } from "./user.interface";


export const FullNameSchema = new Schema<TFullName>({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    }
    
})

export const AddressSchema = new Schema<TAddress>({
    street : {
        type : String,
        required :  true
    },
    city : {
        type : String,
        required :  true
    },
    country : {
        type : String,
        required :  true
    }
})

export const UserSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: FullNameSchema,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: {
    type: AddressSchema,
    required: true,
  },
});


export const User = mongoose.model('User', UserSchema)

