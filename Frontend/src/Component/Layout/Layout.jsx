import React from 'react'
import { Outlet } from 'react-router'
import Header from "../Header/Header"
import Footer from '../Footer/Footer'
import { AuthContextProvider } from '../AuthContext/AuthContextProvider'
function Layout() {
  return (
     <AuthContextProvider>
    <Header/>
    <Outlet/>
    <Footer/>
    </AuthContextProvider>
  )
}

export default Layout



