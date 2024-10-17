import React from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import addProductIcon from '../../assets/logo.png';
import listProductIcon from '../../assets/star_dull_icon.png';

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={addProductIcon} className="sidebar-img1" alt="" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={listProductIcon} alt="" />
          <p>Product List</p>
        </div>
      </Link>

      {user && user.email === 'admin0@gmail.com' && ( 
        <>
          <Link to={'/addadmin'} style={{ textDecoration: "none" }}>
            <div className="sidebar-item">
              <img src={listProductIcon} alt="" />
              <p>Add Admin</p>
            </div>
          </Link>

          <Link to={'/deleteadmin'} style={{ textDecoration: "none" }}>
            <div className="sidebar-item">
              <img src={listProductIcon} alt="" />
              <p>Delete Admin</p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
