
import mongoose from "mongoose";

import bcrypt from 'bcryptjs'

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:'http://pluspng.com/img-png/png-user-icon-icons-logos-emojis-users-2400.png'
    }
},{
    timestamps:true
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)

})

userSchema.methods.matchPasswords=async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
};


 const user=mongoose.model('User',userSchema)

 export default user;