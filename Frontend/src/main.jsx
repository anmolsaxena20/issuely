import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import './index.css'
import LoginPage from './components/LoginPage/LoginPage'
import SignupPage from './components/SignupPage/SignupPage'
import OAuthSuccess from './components/OAuth/OAuth'
import HomePage from './components/HomePage/HomePage'
import AboutPage from './Component/About/About'
import Layout from './components/Layout/Layout'
import ContactUs from "./Component/Contact/Contact"
import ProfilePage from "./Component/Profile/Profile"
import ReportForm from "./Component/ReportForm/ReportForm"
import  QrScanner  from './Component/QrScanner/QrScanner'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/oauth-success' element={<OAuthSuccess/>}/>    // backend will redirect me to this page then this page will redirect me to login/home page based on success/failure
      <Route path='/about' element={<AboutPage />}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/profile' element={<ProfilePage />}/>
      <Route path='/report' element={<ReportForm />}/>
      <Route path='/qrscanner' element={<QrScanner />}/>
    </Route>
 
  )
)


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
