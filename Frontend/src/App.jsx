
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Components/Dashboard/Dashboard';
import Products from './Components/Products/Products'
import Anaytics from './Components/Analytics/Anaytics';
import ProductEdit from './Components/Products/ProductEdit';
import ProductAdd from './Components/Products/ProductAdd';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  
  return (
    <BrowserRouter>
    <div className='mainContainer'>
      <div className='left'>
        <Navbar />
      </div>
      <div className='right'>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Anaytics' element={<Anaytics />} />
          <Route path='/products/:id/edit' element={<ProductEdit />} />
          <Route path='/add-product' element={<ProductAdd />} />
         
        </Routes>
      </div>
    </div>

    </BrowserRouter>
  )
}

export default App
