import { NextFunction, Request, Response } from "express";
import validateZodError from "../errors/ValidateZodError";
import config from "../app/config";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let errorMessage = "Something went wrong!";
    let statusCode = 400
  
    if (err?.name === "ZodError") {
      const zodErr = validateZodError(err);
      errorMessage = zodErr.ZodMessage
    }
  
    if(err.code === 11000){
      console.log(err.message);
      const match = err.message.match(/"([^"]*)"/);
      const extractMessage = match && match[1];
      errorMessage = `${extractMessage} is already exist!`
    }

    if(err?.name === 'ValidationError'){
        console.log(err.message);
        const pattern = /"([^"]+)"/;
        const match = err.message.match(pattern);
        errorMessage = `${match && match[1]} is not a valid ID`
    }
  
    res.status(statusCode).json({
      status: false,
      message: "something went wrong",
      errorMessage,
      errorDetails: err?.name === 'ValidationError' && err?.errors || err,
      stack: config.node_env === "development" ? err?.stack : "",
    });
  }

  export default globalErrorHandler