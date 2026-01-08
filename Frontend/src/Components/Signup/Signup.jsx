import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { GithubIcon, CircleUserRound } from "lucide-react"
import loginImage from "../LoginPage/loginImage.png"
export default function Signup() {
  const [signupDetail, setSignupDetail] = useState({

    name: "",
    email: "",
    role: "",
    department: "",
    contact: "",
    password: ""
  })
  const [role, setRole] = useState("student");

  const navigate = useNavigate();
  const onChangeDetail = (e) => {
    setSignupDetail({
      ...signupDetail, [e.target.name]: e.target.value,
    })
    if (e.target.name == 'role') setRole(e.target.value);
  }

  const SignupUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(signupDetail)
        }
      );
      const data = await res.json()
      if (res.ok) {
        navigate("/login")
      } else {
        alert('signup failed')
      }
    } catch (error) {
      console.log("Error in signup", error)
    }
  }
  return (
    <div className="min-h-screen w-screen flex items-center p-6 justify-center bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a] ">

      <div className="bg-[#01040411] w-full max-w-4xl rounded-2xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Title */}
        <div className="p-8 ">
        <h2 className="text-2xl font-bold  flex justify-center mb-4  text-blue-500">Signup</h2>
        
          {/*Full name */}
          <div className="mb-6 ">
             <label className="text-sm text-pink-600">Name</label>
            <div className="flex items-center hover:border-red-300 py-2">
              <span className="text-gray-400 mr-2">👤</span>
              <input
                type="text"
                name="name"
                value={signupDetail.name}
                onChange={onChangeDetail}
                placeholder="Enter your  name"
                className="w-full outline-none hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm  text-amber-600"
              />
            </div>
          </div>

          {/*Email */}

          <div className="mb-6">
            <label className="text-sm text-pink-600">Email</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="text-gray-400 mr-2">📧</span>
              <input
                type="text"
                name="email"
                value={signupDetail.email}
                onChange={onChangeDetail}
                placeholder="Enter your email"
                className="w-full outline-none hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm  text-amber-600"
              />
            </div>
          </div>
          {/* Role */}

          <select
            name="role"
            onChange={onChangeDetail}
            required
            className="w-full p-2 mb-4 rounded text-pink-400"
          >
            <option value="" className="bg-gray-800 text-amber-800">Select Role</option>
            <option value="student" className="bg-gray-800 text-amber-800">Student</option>
            <option value="staff" className="bg-gray-800 text-amber-800">Staff</option>
            <option value="lead" className="bg-gray-800 text-amber-800">Lead</option>
          </select>


          {/* Department */}
          <select
            name="department"
            onChange={onChangeDetail}
            required
            className="w-full p-2 mb-4 rounded text-pink-400"
          >
            <option value="" className="bg-gray-800 ">Select Department</option>
            {(role == 'student' || role == 'lead') && (
              <>
                <option value="ECE" className="bg-gray-800 text-amber-800">ECE</option>
                <option value="CSE" className="bg-gray-800 text-amber-800">CSE</option>
                <option value="EE" className="bg-gray-800 text-amber-800">EE</option>
                <option value="PIE" className="bg-gray-800 text-amber-800">PIE</option>
                <option value="MECH" className="bg-gray-800 text-amber-800">MECH</option>
              </>
            )}
            {role == "staff" && (
              <>
                <option value="Maintainance">MAINTAINTANANCE</option>
                <option value="Electrical">ELECTRICAL</option>
                <option value="Plumbing">PLUMBING</option>
                <option value="Sweeper">SWEEPER</option>
                <option value="IT">IT</option>
              </>
            )}
          </select>


          {/* contact info */}
          <div className="mb-3">
            <label className="text-sm text-pink-600">Contact Info</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="text-gray-400 mr-2">📞</span>

              <input
                type="text"
                name="contact"
                value={signupDetail.contact}
                onChange={onChangeDetail}
                placeholder="Enter your contact no"
                className="w-full outline-none hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm  text-amber-600"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="text-sm text-pink-600">Password</label>
            <div className="flex items-center  border-gray-300 py-2">
              <span className="text-gray-400 mr-2">🔒</span>
              <input
                type="password"
                name="password"
                value={signupDetail.password}
                onChange={onChangeDetail}
                placeholder="Enter your password"
                className="w-full outline-none hover:border-red-400 hover:border-2 rounded-lg p-2 text-sm  text-amber-600"
              />

            </div>
          </div>



          {/* Login Button */}
          <button
            className="w-full py-2 rounded-full text-red-700 font-semibold bg-linear-to-r from-cyan-400 via-blue-400 to-pink-500 hover:opacity-90 transition cursor-pointer hover:scale-90"
            onClick={SignupUser}
          >
            Signup
          </button>

          {/* Social Login */}
          <p className="text-center text-xs text-cyan-400 mt-6">
            Or Signup Using
          </p>

          <div className="flex flex-col justify-center gap-4 mt-4">
            <button
              onClick={() => window.location.href = "http://localhost:5000/auth/google"}
              className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-pink-500 hover:rounded-2xl"
            >
              <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-5" />
              Continue with Google
            </button>

            <button
              onClick={() => window.location.href = "http://localhost:5000/auth/github"}
              className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-pink-500 hover:rounded-2xl"
            >
              <GithubIcon />
              Continue with GitHub
            </button>

          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-black mt-8">
            Already have an acount?
            <Link to="/login" className="text-blue-200 cursor-pointer hover:text-blue-600">Sign in</Link>
          </p>
        </div>
         <div className="overflow-hidden hidden md:block ">
        <img src={loginImage}  className="object-cover w-full h-full"/>
       </div>
      </div>

    </div>
  );
}
