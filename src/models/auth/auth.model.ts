import { model, Schema } from "mongoose";
import { TPasswordHistory, TUser } from "./auth.interface";
import bcrypt from "bcrypt";
import config from "../../app/config";

const passwordHistorySchema = new Schema<TPasswordHistory>({
  password: {
    type: String,
    required: true,
  },
  changeAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

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
      enum: ["user", "admin"],
      default: "user",
    },
    passwordHistory: {
      type: [passwordHistorySchema],

    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.salt_round));

  if (user?.password && user?.passwordHistory) {
    user.passwordHistory = [
      {
        password: user.password,
        changeAt: new Date(),
      },
      ...user.passwordHistory,
    ];
  }

  next();
});

userSchema.post("save", function () {
  this.password = "";
});

userSchema.methods.checkPasswordReduce = async function (
  newPassword: string
): Promise<boolean> {
  const user = this;

  const currentPasswordMatched = await bcrypt.compare(
    newPassword,
    user?.password
  );

  if (currentPasswordMatched) return true;

  for (const history of user.passwordHistory) {
    const historyPasswordMatch = await bcrypt.compare(
      newPassword,
      history.password
    );
    if (historyPasswordMatch) return true;
  }

  return false;
};

export const User = model<TUser>("User", userSchema);
