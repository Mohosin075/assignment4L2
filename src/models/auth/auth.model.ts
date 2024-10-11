import { model, Schema } from "mongoose";
import { TUser } from "./auth.interface";
import { USER_ROLE } from "./auth.constant";
import bcrypt from "bcrypt";
import config from "../../app/config";

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));
  next();
});

userSchema.post("save", function () {
  this.password = "";
});

export const User = model<TUser>("user", userSchema);
