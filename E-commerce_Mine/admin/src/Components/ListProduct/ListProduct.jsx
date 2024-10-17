import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cart_cross_icon.png'

const ListProduct = () => {
  const [allproducts,setAllProducts] = useState([]);

  const fetchProducts = async()=>{
    await fetch("http://localhost:4000/allproducts")
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const deleteProduct = async(id)=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if(confirmDelete){
    await fetch('http://localhost:4000/deleteproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',

      },
      body:JSON.stringify({id:id})
    })
    await fetchProducts();
  }else{
    console.log("Delete Process is canceled!");
  }
 }
  

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-main">
        <p className="div1">Products</p>
        <p className="div1">Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p className="div2">Remove</p>
      
      </div>
       
       <div className="listproduct-allproducts">
        <hr/>
        {allproducts.map((product,idx)=>{
          return<><div key={idx} className="listproduct-main listproduct-format">
            <img src={product.image} alt="" className='listproduct-img' />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{deleteProduct(product.id)}} src={cross_icon} alt="" className='listproduct-delete-icon'/>
          </div>

          <hr/>
          </> 
        })}
       </div>
    </div>
  )
}

export default ListProduct