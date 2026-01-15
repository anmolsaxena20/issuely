import React, { useState ,useEffect} from "react";
import { Link, NavLink } from "react-router";
import {Fullscreen, GithubIcon} from "lucide-react"
import useAuth from "../AuthContext/AuthContextProvider"
import { useNavigate } from "react-router-dom";
import loginImage from "./loginImage.png"
import useSocket from "../../Context/SocketContext";
import { toast,Toaster } from "react-hot-toast";

export default function Login() {
  const [loginDetail,setLoginDetail] = useState({
    email:"",
    role:"",
    password:""
  })
  const navigate = useNavigate();
  const socket = useSocket();

 const {isLogin,setIsLogin,role,setRole,setUser} = useAuth();
  const onChangeDetail = (e)=>{
    setLoginDetail(
      {
        ...loginDetail,[e.target.name]:e.target.value,
      }
    )
  }

  const loginUser = async(e)=>{
    e.preventDefault();
    try {
      const res  = await fetch("http://localhost:5000/auth/login",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(loginDetail)
      }
    )
    const data = await res.json();

    if(res.ok){
      localStorage.setItem("token",data.token)
      setUser(data);
      setIsLogin(true);
      setRole(data.role)  // res kaise aata hai us basis pe update kar denge
      navigate("/");
      toast.success("Login successfull",{duration:10000,position:"top-right"})
    }else{
      toast.error("login failed")
    }
    } catch (error) {
      console.log("error in login",error);
    }

  }
  return (
    <>
    
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a]">
      <div className="bg-[#01040411] w-full max-w-4xl rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Title */}
        <div className="p-8 ">
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-400">Login</h2>
        <Toaster position="top-right" reverseOrder={false} />     
         

        {/* Username */}
        <div className="mb-6">
          <label className="text-sm text-pink-600">Email</label>
          <div className="flex items-center   py-2">
            <span className="text-gray-400 mr-2">👤</span>
            <input
              type="text"
              name="email"
              value={loginDetail.email}
              onChange={onChangeDetail}
              placeholder="Enter your Email"
              className="w-full outline-none hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm  text-amber-600"
            />
          </div>
        </div>
         <select
        name="role"
        onChange={onChangeDetail}
        required
        className="w-full p-2 mb-4 rounded text-pink-500"
      >
        <option value="" className="bg-gray-800">Select Role</option>
        <option value="student" className="bg-gray-800">Student</option>
        <option value="staff" className="bg-gray-800">Staff</option>
        <option value="lead" className="bg-gray-800 hover:bg-red-950">Lead</option>
      </select>

        {/* Password */}
        <div className="mb-3">
          <label className="text-sm text-pink-600">Password</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="password"
              name="password"
              value={loginDetail.password}
              onChange={onChangeDetail}
              placeholder="Enter your password"
              className="w-full  hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm text-amber-600 "
            />
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-6">
          <NavLink to="" className="text-xs hover:text-blue-800 text-blue-500 ">
            Forgot password?
          </NavLink>
        </div>

        {/* Login Button */}
        <button 
        onClick={loginUser}
        className="w-full py-2 rounded-full text-red-700 font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-pink-500 hover:opacity-90 transition cursor-pointer hover:scale-90">
          LOGIN
        </button>
      
        <p className="text-center text-xs text-cyan-400 mt-6">
          Or Sign in Using
        </p>

        <div className="flex flex-col justify-center gap-4 mt-4">
          <button
            onClick={() => window.location.href = "http://localhost:5000/auth/google"}
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-pink-500 hover:rounded-2xl"
          >
            <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-5 " />
            Continue with Google
          </button>

          <button
            onClick={() => window.location.href = "http://localhost:5000/auth/github"}
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-pink-500 hover:rounded-2xl "
          >
            <GithubIcon/>
            Continue with GitHub
          </button>

        </div>


        {/* Sign up */}
        <p className="text-center  text-black text-sm mt-8">
          Don't have an acount?
        <Link to="/signup" className="text-blue-200 cursor-pointer hover:text-blue-600">Signup</Link>
        </p>
       </div>
        <div className="overflow-hidden hidden md:block ">
        <img src={loginImage} alt="" className="object-cover w-full h-full"/>
       </div>
       </div>
  
      
      </div>
   
   
  </>
  );
}



