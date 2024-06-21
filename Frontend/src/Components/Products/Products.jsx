import React, { useEffect, useState } from 'react';
import './Products.css';
import search from '../Assests/search.svg';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    const fetchProductCount = async () => {
      try {
        const response = await fetch('http://localhost:5000/products/count');
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        const data = await response.json();
        setTotalProducts(data.count);
      } catch (error) {
        console.error('Error fetching product count:', error);
        setError(error.message);
      }
    };

    fetchProducts();
    fetchProductCount();
  }, []);

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
  <p className='p'>Product</p>
  <ColoredLine color="gray" />
</div>

      <h2>Products</h2>
      
      <div className='maincontainer'>
        <div className="search-bar">
          <input type="text" className="search-input" placeholder="Search" />
          <span className="search-icon"><img src={search} alt='search' /></span>
        </div>
        <div className='buttondiv'>
          <Link to="/add-product"><button className='addbutton'>Add Product</button></Link>
        </div>
      </div>
      <p>Total Products: {totalProducts}</p>
     
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td><Link to={`/products/${product._id}/edit`}>{product.name}</Link></td>
              <td><span className='category'>{product.category}</span></td>
              <td>{product.quantity}</td>
              <td>${product.price}</td>
              <td>${product.quantity * product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;