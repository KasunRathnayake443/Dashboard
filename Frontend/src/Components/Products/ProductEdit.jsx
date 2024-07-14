import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductEdit.css';

function ProductEdit() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching product');
        }
        const product = await response.json();
        setName(product.name);
        setCategory(product.category);
        setQuantity(product.quantity);
        setPrice(product.price);
        if (product.image) {
          setImagePreview(`http://localhost:5000${product.image}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }
  
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorData;
        if (contentType && contentType.indexOf("application/json") !== -1) {
          errorData = await response.json();
        } else {
          const text = await response.text();
          errorData = { message: text };
        }
        console.error('API response error:', errorData);
        throw new Error(errorData.message || 'Failed to update product');
      }
  
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete product:', errorData);
        throw new Error(errorData.message || 'Failed to delete product');
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 0.5,
      }}
    />
  );

  return (
    <div>
      <div>
        <p className="p">
          Product <span>Edit Product Details</span>
        </p>
        <ColoredLine color="gray" />
      </div>
      <h2>Edit Product Details</h2>
      <div className="product-edit">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="formMain">
              <div className="formLeft">
                <label>
                  Product Name:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                  Category:
                  <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </label>
                <label>
                  Select Units:
                  <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </label>
                <label>
                  Price Per Unit:
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
              </div>
              <div className="formRight">
                <label className="custom-file-upload">
                  <h3>Product Images</h3>
                  <input type="file" onChange={handleImageChange} />
                  + Add Image
                </label>
                {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
              </div>
            </div>
            <div className="formbuttons">
              <button type="button" onClick={handleDelete} className="deletebutton">
                Delete
              </button>
              <button type="submit" className="savebutton">
                Save Changes
              </button>
            </div>
          </form>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default ProductEdit;