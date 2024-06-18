
import express from 'express'
const router=express.Router()




import { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    check
    
} from '../controller/userController.js' 


import { protuct } from '../middleware/authMiddleware.js';

import upload from '../utile/imageHandil.js';


router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protuct,getUserProfile).put(protuct,updateUserProfile)
router.post('/check',protuct,check)

 


export default router;