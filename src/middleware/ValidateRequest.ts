import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const ValidateRequest =(schema : AnyZodObject)=>{
    return (req : Request, res : Response, next : NextFunction) =>{
        try {
            schema.parseAsync(req.body);
        next()
        } catch (error) {
            console.log(error);
            res.json({error})
        }
    }
}

export default ValidateRequest