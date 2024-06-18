import express from 'express'
const adminRouter=express.Router()

import {
    login,
    logout,
    deleleUser,
    addUser,
    editUser,
} from '../controller/adminController.js'

import { admin } from '../middleware/adminMiddleware.js';


adminRouter.post('/login',login)
adminRouter.post('/logout',logout);
adminRouter.put('/delete',admin,deleleUser);
adminRouter.put('/addUser',addUser);
adminRouter.put('/editUser',editUser);



export default adminRouter;






