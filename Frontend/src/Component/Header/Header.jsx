import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { NotificationBell } from '../Notification/Notification'
import Logout from '../Logout/Logout'
import useAuth from "../AuthContext/AuthContextProvider"

function Header() {
  // i have to some how have the idea that whether user is login or not
  const{isLogin,role} = useAuth();
  return (
    <header className="shadow sticky z-50 top-0 w-screen">
    <div className="h-fit w-screen  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-white ">
      {/* Navbar */}
      <nav className="flex  items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">MNNIT ALLAHABAD</h1>
        <ul className="flex  gap-8 text-sm font-medium conte">
          <Link className="cursor-pointer hover:underline ">Home</Link>
          <Link to="/about" className="cursor-pointer hover:underline">About</Link>
          <Link to ="/report" className="cursor-pointer hover:underline">Issue ?</Link>
          <Link to="/issuesearch" className="cursor-pointer hover:underline">Issue Status</Link>
          <Link to="/contact" className="cursor-pointer hover:underline">Contact</Link>
          <Link to="" className="cursor-pointer hover:underline"><NotificationBell/></Link>
          {
            role == 'staff' &&
            <Link to="/staff/issue">🧑‍🔧 My Assigned Issues</Link>
          }
          {!isLogin &&
            <Link to="/login" className="cursor-pointer hover:underline hover:bg-fuchsia-300 bg-fuchsia-200 p-2 rounded-md" >Login/signup</Link>
          }
          {isLogin && 
            <Logout/>
          }
        </ul>
      </nav>
    </div>
    </header>
  )
}

export default Header