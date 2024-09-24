import { NextFunction, Request, Response } from "express";
import validateZodError from "../errors/ValidateZodError";
import config from "../app/config";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Something went wrong!";
    let message = "Something went wrong!";
    let statusCode = 400
  
    if (err?.name === "ZodError") {
      const zodErr = validateZodError(err);
      errorMessage = zodErr.ZodMessage;
      message = err?.name
    }
  
    if(err.code === 11000){
      console.log(err.message);
      const match = err.message.match(/"([^"]*)"/);
      const extractMessage = match && match[1];
      errorMessage = `${extractMessage} is already exist!`
      message = 'Cast Error , error code : 11000'
    }

    if(err?.name === 'ValidationError'){
        const pattern = /"([^"]+)"/;
        const match = err.message.match(pattern);
        errorMessage = `${match && match[1]} is not a valid ID`
        message = err?.name
    }

    if(err.name ==='notFound'){
      errorMessage = err.message;
      message = err.name
    }
  
    res.status(statusCode).json({
      status: false,
      message,
      errorMessage,
      errorDetails: err?.name === 'ValidationError' && err?.errors || err,
      stack: config.node_env === "development" ? err?.stack : "",
    });
  }

  export default globalErrorHandler