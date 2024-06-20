import React, {useEffect, useState} from 'react'
import './Products.css'
import search from '../Assests/search.svg';


function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>

      <div className="search-bar">
      <input type="text" className="search-input" placeholder="Search" />
      <span className="search-icon"><img src={search} alt=''/></span>
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
              <td>{product.name}</td>
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