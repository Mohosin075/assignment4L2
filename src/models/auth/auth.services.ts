import config from "../../app/config";
import { TLoinUser, TUser } from "./auth.interface";
import { User } from "./auth.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    throw new Error(`Password in incorrect!`);
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

export const AuthServices = {
  createUser,
  loginUser,
};
