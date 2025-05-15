import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import SearchVehicles from './pages/SearchVehicles'
import SearchCustomers from './pages/SearchCustomers'
import Calender from './pages/Calendar'
import NotFound from './pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




function App() {
  return (
    <Router>
      <nav className='navbar navbar-expand navbar-dark bg-dark mb-4'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>Garage CMS</Link>
          <div className='navbar-nav'>
          <Link className='navbar-brand' to='/vehicles'>Vehicles</Link>
          <Link className='navbar-brand' to='/customers'>Customers</Link>
          <Link className='navbar-brand' to='/calendar'>Calendar</Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/vehicles' element={<SearchVehicles/>} />
        <Route path='/customers' element={<SearchCustomers/>}/>
        <Route path='/calendar' element={<Calender/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
