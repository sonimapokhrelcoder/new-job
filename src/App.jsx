import React from 'react'
import { BrowserRouter, Routes , Router , Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import Apply from './pages/Apply'
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import ProfilePage from './pages/Profile';
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/jobs' element={<Jobs/>}/>
        <Route path='/apply' element={<Apply/>}/>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </>
  )
}

export default App