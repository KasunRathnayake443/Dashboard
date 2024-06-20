import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom';
import logo from '../Assests/logo.png'
import dashboard from '../Assests/dashboard-inactive.svg'
import analytics from '../Assests/analytics-inactive.svg'
import products from '../Assests/products-active.svg'


const Navbar = () => {
    const [menu,setMenu] = React.useState('Products')

  return (
    <div className='navbar'>
        <div className='navlogo'>
            <img className='logo' src={logo} alt='logo' />
        </div>
       
        
        <div className='navlinks'>
           <Link to='/Dashboard'>
            <div onClick={()=>{setMenu("Dashboard")}} className={menu==="Dashboard"?"active":""}>
               <img src={dashboard} alt='icon' />
                <h2>Dashboard</h2>   
            </div>
            </Link> 
            <Link to='/Anaytics'>
           <div onClick={()=>{setMenu("Analytics")}} className={menu==="Analytics"?"active":""}> 
               <img src={analytics} alt='icon' />
                <h2>Analytics</h2>
            </div> 
            </Link>
            <Link to='/'>
            <div onClick={()=>{setMenu("Products")}} className={menu==="Products"?"active":""}> 
               <img src={products} alt='icon' />
                <h2>Products</h2>
            </div>
            </Link>
        </div>
        
        
    </div>
  )
}

export default Navbar

