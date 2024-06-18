
import express from 'express';
const app=express();

import dotenv from 'dotenv'
dotenv.config()

const port=process.env.PORT || 5000;

import userRout from './router/userRouter.js'
import adminRouter from './router/adminRouter.js'

import { errorHandler,notFound } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js';

connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.use('/api/users',userRout);
app.use('/api/admin',adminRouter);


app.get('/',(req,res)=>res.send('surver is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log(`surver is running ${port}`))

