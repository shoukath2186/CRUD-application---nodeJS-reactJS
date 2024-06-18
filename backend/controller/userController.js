
import asyncHandiler from 'express-async-handler';
import genarateToken from '../utile/generateToken.js'
import User  from '../models/UserModel.js';


//login
const authUser=asyncHandiler(async (req,res)=>{

    const{email,password}=req.body;

    const user=await User.findOne({email})

    if(user && (await user.matchPasswords(password))){
        genarateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        })
    }else{
        res.status(401)
        throw new Error("invalid Email or password.")
    }

})

//register
const registerUser=asyncHandiler(async (req,res)=>{
       
    const {name,email,password} = req.body;
 
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error ('User alrdy exists')
    }

   // console.log(req.body);

    let imageUrl;
    if(req.body.image){
        imageUrl=req.body.image
    }

    const user=await User.create({
        name,
        email,
        password,
        image:imageUrl
        
    })

    //console.log(user);

    if(user){
        genarateToken(res, user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.image
        })
    }else{
        res.status(400)
        throw new Error("invalid user data")
    }


})

//logout
const logoutUser=asyncHandiler(async (req,res)=>{
  
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })

    res.status(200).json({message:'User logged Out'})

})

//get UserProfile
const getUserProfile=asyncHandiler(async (req,res)=>{

    //console.log(req.user)

    const user={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email,
    }
    
    res.status(200).json(user)


})

//updateUserProfile
const updateUserProfile=asyncHandiler(async (req,res)=>{
    
    const user=await User.findById(req.user._id)
    let file=req.body

    //console.log(11111,file);

    if(user){
        user.name=req.body.name||user.name,
        user.email=req.body.email||user.email

        if(req.body.password){
            user.password=req.body.password
        }
        if (req.body.image) {
            user.image=req.body.image;
        }



        
        await user.save()

    }else{
        res.status(404);
        throw new Error('User not found')
    }


    //console.log(2211);
    const newuser=await User.findById(req.user._id)


     //console.log(2222,newuser);


    res.status(200).json({ 
        _id:newuser._id,
        name:newuser.name,
        email:newuser.email,
        image:newuser.image,
    })

})

const check=async (req,res)=>{

     req.body.id;
    const user =await User.findById(req.body.id)

    if(user){
        res.status(200).json('user is exist');
    }else{
        res.status(404).json('User not found'); 
    }
}


export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    check,
}