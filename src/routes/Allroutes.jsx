import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Home from '../components/home/home';
import Register from '../components/user/registration';
import Login from '../components/user/login';
import Update from '../components/user/update';
import Appoinment from '../components/appoinment/Appoinment';
//import Navbar from '../components/navbar/Navbar';

const Allroutes = () => {
  return (
    <>
    <Routes> 
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/update' element={<Update />} />
        {/* <Route path='/home' element={<Navbar />} /> */}
        <Route path='/appoinment' element={<Appoinment />} />
    </Routes>
    </>
  )
}

export default Allroutes