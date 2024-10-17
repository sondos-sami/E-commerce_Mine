import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import addProductIcon from '../../assets/logo.png';
import listProductIcon from '../../assets/star_dull_icon.png';
import addAdminIcon from '../../assets/star_dull_icon.png';
import deleteAdminIcon from '../../assets/star_dull_icon.png';
import listAdminsIcon from '../../assets/star_dull_icon.png'; 

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          <img src={addProductIcon} className='sidebar-img1' alt='' />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={'/listproduct'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          <img src={listProductIcon} alt='' />
          <p>Product List</p>
        </div>
      </Link>

      <Link to={'/addadmin'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          <img src={addAdminIcon} alt='' />
          <p>Add Admin</p>
        </div>
      </Link>

  

      <Link to={'/listadmins'} style={{ textDecoration: 'none' }}>
        <div className='sidebar-item'>
          <img src={listAdminsIcon} alt='' />
          <p>List Admins</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
