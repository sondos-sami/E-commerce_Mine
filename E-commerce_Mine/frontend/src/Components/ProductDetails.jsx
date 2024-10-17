 
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/ProductDetails.css';

 export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
    
  useEffect(() => {
    // Fetch product details by id
    fetch(`http://localhost:4000/allproducts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Product not found');
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message)); // Handle any errors
   
  },[id]);

  // Handle loading state
  if (!product && !error) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="details">
        <h1>{product.name}</h1>
        <p><strong>Price:</strong> ${product.old_price}</p>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

 


