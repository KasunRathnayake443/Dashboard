import React, { useEffect, useState } from 'react';
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
      .then(response => response.json())
      .then(() => navigate('/'))  // Navigate to home page after save
      .catch(error => setError(error.message));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/products/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => navigate('/'))  // Navigate to home page after delete
      .catch(error => setError(error.message));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
    <h1>Edit Product</h1>
    <form>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={product.name} readOnly />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" value={product.category} readOnly />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input type="number" value={product.quantity} readOnly />
      </div>
      <div className="form-group">
        <label>Price:</label>
        <input type="number" value={product.price} readOnly />
      </div>
      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={handleDelete}>Delete</button>
    </form>
  </div>
  );
}

export default ProductEdit;