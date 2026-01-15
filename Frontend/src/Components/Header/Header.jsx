import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { NotificationBell } from '../Notification/Notification'
import Logout from '../LogoutPage/LogoutPage'
import useAuth from "../AuthContext/AuthContextProvider"
import ProfilePage from '../Profile/Profile'
import { CircleUserRound} from "lucide-react"

function Header() {
  // i have to some how have the idea that whether user is login or not
  const{isLogin,role} = useAuth();
  return (
    <header className="shadow sticky z-50 top-0 w-screen bg-[#0c1138] border-b border-[#16B4C6]/20 text-gray-200">
    <div className="h-fit w-screen   text-white ">
      {/* Navbar */}
      <nav className="flex  items-center justify-between px-10 py-6">
        <h1 className="text-2xl font-bold">MNNIT ALLAHABAD</h1>
        <ul className="flex  gap-8 text-sm font-medium conte">
          <Link className="cursor-pointer hover:underline ">Home</Link>
          <Link to="/about" className="cursor-pointer hover:underline hidden md:block">About</Link>
          <Link to ="/report" className="cursor-pointer hover:underline">Issue </Link>
          <Link to="/issuesearch" className="cursor-pointer hover:underline">Issue Status</Link>
          <Link to="/contact" className="cursor-pointer hover:underline  hidden md:block">Contact</Link>
          { (role=="lead" && isLogin) &&
          <Link to="/request" className="cursor-pointer hover:underline hidden md:block"><button>🔔</button></Link>
          }
          {
            (role == 'staff' && isLogin) &&
            <Link to="/staff/issue">🧑‍🔧 My Assigned Issues</Link>
          }
          {
            (isLogin && role=='lead') && <Link to='/admin'  className="p-2 rounded bg-linear-to-br from-fuchsia-400 to bg-pink-800 flex hover:rounded-2xl hover:bg-pink-900">Admin Dashboard</Link>
          }
          {!isLogin &&
            <Link to="/login" className="p-2 rounded bg-linear-to-br from-fuchsia-400 to bg-pink-800 flex hover:rounded-2xl hover:bg-pink-900">Login/signup</Link>
          }
          {isLogin && 
            <Logout/>
          }
          {
            isLogin && <Link to="/profile" className="p-2 rounded bg-linear-to-br from-fuchsia-400 to bg-pink-800  hover:rounded-2xl hover:bg-pink-900 hidden sm:block" > <span className='flex'><CircleUserRound/>My Profile</span></Link>
          }
        </ul>
      </nav>
    </div>
    </header>
  )
}

export default Header