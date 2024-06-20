
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Components/Dashboard/Dashboard';
import Products from './Components/Products/Products'
import Anaytics from './Components/Analytics/Anaytics';
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
         
        </Routes>
      </div>
    </div>

    </BrowserRouter>
  )
}

export default App
