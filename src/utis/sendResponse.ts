import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
};

const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data,
  });
};

export default SendResponse;
