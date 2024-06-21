import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductEdit.css';

function AddProduct() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('http://localhost:5000/products/add', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        navigate('/');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setError(error.message);
    }
  };
  const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
);
  
  return (
    <div>
      <div>
  <p className='p'>Product > <span> Add Product</span>  </p>
  <ColoredLine color="gray" />
</div>
      <h2>Add Product</h2>
    
    <div className="product-edit">
    <h3>General Information</h3>
      <form onSubmit={handleSubmit}>
      <div className='formMain'>
          <div className='formLeft'>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        </div>
        <div className='formRight'>
        <label className="custom-file-upload">
        <h3>Product Images</h3>
          <input type="file" onChange={handleImageChange} />
          + Add Image
        </label>
        {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>
        </div>
        <div className='formbuttons'>
        <button type="submit">Add Product</button>
        {error && <p className="error">{error}</p>}
        </div>
      </form>
    </div>
    </div>
    
  );
}

export default AddProduct;