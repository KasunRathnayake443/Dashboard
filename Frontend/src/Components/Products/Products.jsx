import React, {useEffect, useState} from 'react'
import './Products.css'
import search from '../Assests/search.svg';
import { Link } from 'react-router-dom';


function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
  <div className='maincontainer'>
      <div className="search-bar">
      <input type="text" className="search-input" placeholder="Search" />
      <span className="search-icon"><img src={search} alt=''/></span>
    </div>
    <div className='buttondiv'>
    <Link to="/add-product"><button  className='addbutton'> Add Product</button></Link>
    </div>
    </div>
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