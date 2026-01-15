import React from 'react'
import { Outlet } from 'react-router'
import Header from "../Header/Header"
import Footer from '../Footer/Footer'
import { AuthContextProvider } from '../AuthContext/AuthContextProvider'
import { SocketProvider } from '../../Context/SocketContext'
function Layout() {
  return (
     <AuthContextProvider>
    
    <Header/>
    
    <Outlet/>
    
    <Footer/>
    
    </AuthContextProvider>
  )
}

export const ProtectedLayout=() =>{
  return (
    
    <SocketProvider>
      <Outlet />
    </SocketProvider>
  );
}

export default Layout



