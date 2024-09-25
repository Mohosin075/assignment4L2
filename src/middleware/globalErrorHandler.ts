import { NextFunction, Request, Response } from "express";
import validateZodError from "../errors/ValidateZodError";
import config from "../app/config";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Something went wrong!";
    let message = "";
    let statusCode = 400;
    let errorDetails = err
  
    if (err?.name === "ZodError") {
      const zodErr = validateZodError(err);
      console.log(zodErr.ZodMessage);
      errorMessage = zodErr.ZodMessage;
      message = err?.name
    }else if(err.code === 11000){
      console.log(err.message);
      const match = err.message.match(/"([^"]*)"/);
      const extractMessage = match && match[1];
      errorMessage = `${extractMessage} is already exist!`
      message = 'Cast Error , error code : 11000'
    }else if(err?.name === 'ValidationError'){
        const pattern = /"([^"]+)"/;
        const match = err.message.match(pattern);
        errorMessage = `${match && match[1]} is not a valid ID`
        message = err?.name
        errorDetails = err?.errors
    }else if(err instanceof Error){
      message = err.name
      errorMessage = err.message
      errorDetails = err.message
    }else if(err.name ==='notFound'){
      errorMessage = err.message;
      message = err.name
    }
  
    // console.log(errorMessage);

    res.status(statusCode).json({
      status: false,
      message,
      errorMessage,
      errorDetails,
      // errorDetails: err?.name === 'ValidationError' && err?.errors || err,
      stack: config.node_env === "development" ? err?.stack : "",
    });
  }

  export default globalErrorHandler