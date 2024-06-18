import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './adminComponent/header';
import { ToastContainer } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

const AdminLayout = () => {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Outlet />
       
    </>
  );
};

export default AdminLayout;