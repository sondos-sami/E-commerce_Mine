/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slice'; 
import '../styles/Card.css'

const Card = ({ product }) => {
  const dispatch = useDispatch();

  // Accessing cart state from Redux with a fallback to an empty array
  const cartItems = useSelector((state) => state.cart || []); 

  // Check if the product is already in the cart and get its quantity
  const cartItem = cartItems.find((item) => item.id === product.id);
  const isInCart = !!cartItem;  
  const quantity = cartItem ? cartItem.quantity : 0;  

  return (
    <div className='row'> 
    <div className="card w-100 h-100" style={{ width: '100%', margin: 'auto', border: '1px solid #ddd', borderRadius: '0.5rem' }}>
      <img src={product.image} className="image-container" alt={product.name}    />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title" style={{ fontSize: '1rem' }}>{product.name}</h5>
        <p className="card-text" style={{ fontSize: '0.9rem' }}>Price: <strong>${product.old_price}</strong></p>
        
        <Link to={`/product/${product.id}`} className="btn btn-primary btn-sm mb-2">
          View Details
        </Link>

        <button
          className={`btn w-100 ${isInCart ? "btn-success" : "btn-primary"} btn-sm`}
          onClick={() => dispatch(addToCart(product))}   
        >
          {isInCart ? `In Cart (${quantity})` : "Add To Cart"}
        </button>
      </div>
    </div>
    </div>
  );
};

export default Card;
