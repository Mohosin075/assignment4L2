import { NextFunction, Request, Response } from "express";

const NotFound =(req : Request, res: Response, next : NextFunction) =>{
    const error = {
        name : 'notFound',
        message : 'API not found'

    }
    throw error
}
export default NotFound