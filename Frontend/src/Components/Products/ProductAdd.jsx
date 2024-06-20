import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductAdd() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
   
    navigate('/', { replace: true }); 
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
      <h1>Add Product</h1>
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
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductAdd;