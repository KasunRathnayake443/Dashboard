import React, {useEffect, useState} from 'react'
import './Products.css'


const Products = () => {

  const [products,setProducts] = useState([{}])

  useEffect(()=>{
    fetch("/api").then(
      Response => Response.json()
    ).then(data => {
      setProducts(data)
    })
  } , [])

  return (
    <>
    <h2>Products</h2>
    </>
  )
}

export default Products