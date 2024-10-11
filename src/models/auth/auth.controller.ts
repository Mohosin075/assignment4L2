import catchAsync from "../../utils/catchAsync";
import SendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";


const createUser =catchAsync(async(req, res, next)=>{
    const result = await AuthServices.createUser(req.body);

    SendResponse(res, {
        success: true,
        statusCode : 200,
        message : 'User created successfully.',
        data : result
    })
});


const loginUser =catchAsync(async(req, res, next)=>{
    const result = await AuthServices.loginUser(req.body);

    SendResponse(res, {
        success: true,
        statusCode : 200,
        message : 'User login successfully.',
        data : result
    })
});

export const AuthControllers = {
    createUser,
    loginUser
}