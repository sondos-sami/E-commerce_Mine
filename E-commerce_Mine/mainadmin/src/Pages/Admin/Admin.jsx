import React from 'react';
import './Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import AddProduct from '../../Components/AddProduct/AddProduct';
import ListProduct from '../../Components/ListProduct/ListProduct';
import AddAdmin from '../../Components/AddAdmin/AddAdmin';
// import DeleteAdmin from '../../Components/DeleteAdmin/DeleteAdmin';
import ListAdmins from '../../Components/ListAdmins/ListAdmins';

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar />
      <Routes>
        <Route path='/addproduct' element={<AddProduct />} />
        <Route path='/listproduct' element={<ListProduct />} />
        <Route path='/addadmin' element={<AddAdmin />} />
        {/* <Route path='/deleteadmin' element={<DeleteAdmin />} /> */}
        <Route path='/listadmins' element={<ListAdmins />} />
      </Routes>
    </div>
  );
};

export default Admin;
