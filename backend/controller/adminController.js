import User  from '../models/UserModel.js';
import asyncHandiler from 'express-async-handler';
import genarateToken from '../utile/adminGenerateToken.js'

const adminEmail='admin@gmail.com'
const adminPassword='admin123'

const login = asyncHandiler(async (req, res) => {
    const { email, password } = req.body;

    
    //console.log(req.body);
   
    
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide both email and password.');
    }

    
    if (email === adminEmail && password === adminPassword) {
        
        genarateToken(res, adminEmail);

        
        const users = await User.find();

        
        res.status(200).json(users);
    } else {
        
        res.status(401);
        throw new Error('Invalid email or password.');
    }
});



const logout=async (req,res)=>{

    try {
        res.cookie('jwt','',{
            httpOnly:true,
            expires:new Date(0)
        })
    
        res.status(200).json({message:'admin logged Out'})

    } catch (error) {
        console.log(error.message);
    }
}

const deleleUser=async (req,res)=>{

    try {
        const id=req.body.id
        
        const result = await User.deleteOne({ _id: id });

        

        if (result.deletedCount === 1) {
            const datas=await User.find()
            res.status(200).json(datas)

        } else {
            // console.log(result);
            res.status(401).json('no changes');
            throw new Error("invalid user data");
        }

        
        
    } catch (error) {
        console.log(error.message);
    }
}

const addUser=asyncHandiler(async (req,res)=>{
    //    console.log(req.body);

       const {name,email,password} = req.body;
 
       const userExists=await User.findOne({email})
   
       if(userExists){
           res.status(400)
           throw new Error ('User alrdy exists')
       }
       const user=await User.create({
        name,
        email,
        password
    })
     
    //console.log(6666,user);

    if(user){

        const users = await User.find();

        //console.log(88888,users);
        res.status(200).json(users);

    }else{
        res.status(400)
        throw new Error("invalid user data")
    }
} )



const editUser=asyncHandiler(async (req,res)=>{

     //console.log(111,req.body);
    
     
    const user=await User.findById(req.body._id);

    // console.log(333,user);

    if(user){ 


         user.name = req.body.name;
         user.email = req.body.email;
         if (req.body.password) {
             user.password = req.body.password;
        }
        if(req.body.image){
            user.image=req.body.image
        }

        await user.save();

    }else{

        res.status(404);
        throw new Error('User not found')
    }


   
    const newuser=await User.find();
    res.status(200).json(newuser)


})

export {
    login,
    logout,
    deleleUser,
    addUser,
    editUser
}