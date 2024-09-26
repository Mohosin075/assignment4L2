import { Response } from "express";

type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message?: string;
  meta?: object;
  data: T;
};

const SendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.json({
    success: true,
    statusCode: data.statusCode,
    message: data.message,
    meta : data.meta,
    data: data.data,
  });
};

export default SendResponse;
