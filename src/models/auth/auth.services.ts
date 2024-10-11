import config from "../../app/config";
import { TChangePassword, TLoinUser, TUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoinUser) => {
  const { username, password } = payload;

  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new Error(`${username} is not exist!`);
  }

  const isPasswordMatched = await bcrypt.compare(password, user?.password);

  if (!isPasswordMatched) {
    throw new Error(`Password is incorrect!`);
  }

  const { _id, role, email } = user;

  const payloadData = {
    _id,
    role,
    email,
  };

  const token = jwt.sign(payloadData, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  return {
    user: {
      _id,
      username,
      role,
      email,
    },
    token,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword
) => {
  const user = await User.findById(userData._id).select("+password");

  const isPasswordMatched = await bcrypt.compare(
    payload.currentPassword,
    user?.password as string
  );

  if (!isPasswordMatched) {
    throw new Error(`Password is incorrect!`);
  }

  const hashedPass = await bcrypt.hash(
    payload.newPassword,
    Number(config.salt_round)
  );

  const updatedDoc = await User.findByIdAndUpdate(
    user?._id,
    {
      password: hashedPass,
    },
    {
      new: true,
      runValidators : true
    }
  );

  return updatedDoc
};

export const AuthServices = {
  createUser,
  loginUser,
  changePassword,
};
