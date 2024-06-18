import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import HomeScreen from './sceence/homeScreen'; 
import LoginScreen from './sceence/loginScreen.jsx';
import RegisterScreen from './sceence/registerScreen.jsx';
import ProfileScreen from './sceence/profileScreen.jsx';
import PrivetRouter from './components/privetRouter.jsx';

import AdminLayout from './AdminApp.jsx';
import AdminHomeScreen from './adminScreeen/homeScreen.jsx';
import AdminLoginScreen from './adminScreeen/logInScreen.jsx';
import AddUser from './adminScreeen/addUserScreen.jsx';
import EditUser from './adminScreeen/editUserData.jsx';




const userRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivetRouter />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      
      <Route path='/admin' element={<AdminLayout />}>
        <Route index path='/admin' element={<AdminHomeScreen />} />
         <Route path='/admin/login' element={<AdminLoginScreen />} />
         <Route path='/admin/addUser' element={<AddUser/>} />
         <Route path='/admin/edit' element={<EditUser/>} />
      </Route>
    </Route>
  )
);

export default userRouter;