import React, { useState } from "react";
import { NavLink, Link, redirect } from "react-router";
import {GithubIcon} from "lucide-react"

export default function Signup() {
  const [signupDetail, setSignupDetail] = useState({

    userName: "",
    fullName: "",
    email: "",
    role: "",
    department: "",
    contact: "",
    password: ""
  })

  const onChangeDetail = (e) => {
    setSignupDetail({
      ...signupDetail, [e.target.name]: e.target.value,
    })
  }

  const SignupUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/v1/user/register",
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
        throw redirect("/login")
      } else {
        alert('signup failed')
      }
    } catch (error) {
      console.log("Error in signup", error)
    }
  }
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 ">
      <div className="bg-white w-95 rounded-xl shadow-2xl px-8 py-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8 text-black">Signup</h2>

        {/*Full name */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Full Name</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">👤</span>
            <input
              type="text"
              name="fullName"
              value={signupDetail.fullName}
              onChange={onChangeDetail}
              placeholder="Enter your full name"
              className="w-full outline-none text-sm text-black"
            />
          </div>
        </div>
        {/* Username */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Username</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">👤</span>
            <input
              type="text"
              name="userName"
              value={signupDetail.userName}
              onChange={onChangeDetail}
              placeholder="Enter your username"
              className="w-full outline-none text-sm text-black"
            />
          </div>
        </div>

        {/*Email */}

        <div className="mb-6">
          <label className="text-sm text-gray-600">Email</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">📧</span>
            <input
              type="text"
              name="email"
              value={signupDetail.email}
              onChange={onChangeDetail}
              placeholder="Enter your email"
              className="w-full outline-none text-sm text-black"
            />
          </div>
        </div>
        {/* Role */}

        <select
          name="role"
          onChange={onChangeDetail}
          required
          className="w-full p-2 mb-4 rounded"
        >
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="staff">Staff</option>
          <option value="lead">Lead</option>
        </select>


        {/* Department */}
        <select
          name="department"
          onChange={onChangeDetail}
          required
          className="w-full p-2 mb-4 rounded"
        >
          <option value="">Select Department</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="EE">EE</option>
          <option value="PIE">PIE</option>
          <option value="MECH">MECH</option>
        </select>


        {/* contact info */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Contact Info</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">📞</span>

            <input
              type="text"
              name="contact"
              value={signupDetail.contact}
              onChange={onChangeDetail}
              placeholder="Enter your contact no"
              className="w-full outline-none text-sm text-black"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="password"
              name="password"
              value={signupDetail.password}
              onChange={onChangeDetail}
              placeholder="Enter your password"
              className="w-full outline-none text-sm text-black"
            />
          </div>
        </div>



        {/* Login Button */}
        <button
          className="w-full py-2 rounded-full text-white font-semibold bg-linear-to-r from-cyan-400 to-pink-500 hover:opacity-90 transition hover:cursor-pointer"
          onClick={SignupUser}
        >
          Signup
        </button>

        {/* Social Login */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Or Signup Using
        </p>

        <div className="flex flex-col justify-center gap-4 mt-4">
          <button
            onClick={() => window.location.href = "http://localhost:5000/auth/google"}
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-5" />
            Continue with Google
          </button>

          <button
            onClick={() => window.location.href = "http://localhost:5000/auth/github"}
            className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:cursor-pointer"
          >
            <GithubIcon/>
            Continue with GitHub
          </button>

        </div>

        {/* Sign up */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Already have an acount?
          <Link to="/login" className="text-blue-800 cursor-pointer hover:text-blue-300">Sign in</Link>
        </p>

      </div>
    </div>
  );
}
