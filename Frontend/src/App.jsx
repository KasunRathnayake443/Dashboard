
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Components/Products/Dashboard';
import Products from './Components/Products/Products'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  
  return (
    <div className='mainContainer'>
    <BrowserRouter>
    <div className='left'>
    <Navbar />
    </div>
    <div className='right'>
    <Routes>
  
      <Route path='/Dashboard' element={<Dashboard />} />
      <Route path='/' element={<Products />} />
    </Routes>
    </div>
     </BrowserRouter>
    
    </div>
  )
}

export default App
