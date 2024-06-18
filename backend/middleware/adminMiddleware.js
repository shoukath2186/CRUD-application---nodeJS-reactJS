import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
//import User from '../models/UserModel.js'

const admin=asyncHandler(async (req,res,next)=>{
    let token=req.cookies.jwt;

    if(token){

            next();
            
       

    }else{
        res.status(401);
        throw new Error('Not authorized, no token')
    }
})

export {admin}