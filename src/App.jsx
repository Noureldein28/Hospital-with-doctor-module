import { Outlet } from 'react-router'
import './App.css'
import Navbar from './Shared/Navbar'
import Footer from './Shared/Footer'

function App() {

  return (
   <>
     <Navbar/>
     <Outlet/>
     <Footer/>
   </>
  )
}

export default App
