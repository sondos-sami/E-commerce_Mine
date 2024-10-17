import React, { useState } from 'react'
import './AddProduct.css'
import uploadImage from '../../assets/cart_icon.png'

const AddProduct = () => {
    const [image,setImage] = useState(false);
    const [productDetails,setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        old_price:"",
        new_price:""
    })

    const imageHandler = (e)=>{
         setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value});
    }

    const addProduct = async()=>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append("product", image);

        await fetch("http://localhost:4000/upload",{
            method:"POST",
            headers:{
                Accept:"application/json",
            },
            body:formData,
        }).then((res)=> res.json()).then((data)=> {responseData=data});

        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            await fetch("http://localhost:4000/addproduct",{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(product),
            }).then((res)=>res.json()).then((data)=>{
                data.success?alert("Product Added Successfully"):alert("Failed")
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-item">
            <p>Product Title</p>
            <input type='text' value={productDetails.name} onChange={changeHandler} name='name' placeholder='Type Here'/>
        </div>

        <div className="addproduct-price">
            <div className="addproduct-item">
               <p>Price</p>
               <input type='text'value={productDetails.old_price} onChange={changeHandler} name='old_price' placeholder='Type Here'/>
            </div>

            <div className="addproduct-item">
               <p>Offer Price</p>
               <input type='text' value={productDetails.new} onChange={changeHandler} name='new_price' placeholder='Type Here'/>
            </div>
        </div>
        
        <div className="addproduct-item">
            <p>Product Category</p>
            <select name='category' value={productDetails.category} onChange={changeHandler} className='addProductSelector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
        </div>

        <div className="addproduct-item">
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):uploadImage}  className='addproduct-update-img'  alt="" />
            </label>
            <input type='file' name='image' onChange={imageHandler} id='file-input' hidden />
        </div>

        <button onClick={()=>{addProduct()}} className='addproduct-btn'>ADD</button>
        
    </div>
  )
}

export default AddProduct