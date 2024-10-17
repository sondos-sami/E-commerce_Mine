import React from 'react'
import'./Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddOrDeleteAdmin from '../../Components/AddOrDeleteAdmin/AddOrDeleteAdmin'


const Admin = () => {
  return (
    <div className='admin'>
        <Sidebar/>
        <Routes>
          <Route path='/addproduct' element={<AddProduct/>}/>
          <Route path='/listproduct' element={<ListProduct/>}/>
          <Route path='/addadmin' element={<AddOrDeleteAdmin/>}/>
          {/* <Route path='/deleteadmin' element={<AddOrDeleteAdmin/>}/> */}
        </Routes>
    </div>
  )
}

export default Admin
