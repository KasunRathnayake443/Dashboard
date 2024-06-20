import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductEdit.css';

function ProductEdit() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0
  });

  useEffect(() => {
   
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          setProduct(productData); 
        } else {
          console.error('Failed to fetch product:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct(); 
  }, [id]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      if (response.ok) {
        console.log('Product updated successfully');
        navigate('/', { replace: true }); 
      } else {
        console.error('Failed to update product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  return (
    <div className="container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <input type="text" name="category" value={product.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Quantity:</label>
          <input type="number" name="quantity" value={product.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <button type="submit">Save Product</button>
      </form>
    </div>
  );
}

export default ProductEdit;