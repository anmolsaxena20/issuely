import React, { useState, useEffect } from "react";
import useAuth from "../AuthContext/AuthContextProvider"
export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
    department: "",
    password: ""
  });
  const { user, isLogin, setUser } = useAuth();
  const [loading, setLoading] = useState(true)
  const [isUpdate, setUpdate] = useState(false);


  useEffect(() => {
    const fetchProfile = () => {
      if (isLogin) {
        console.log("user data in profile page", user);
        setProfile(user);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setUpdate(true);
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }



  const updateProfile = async (e) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = { id: user.id, name: profile.name, email: profile.email, password: profile.password, role: profile.role, contact: profile.contact, department: profile.department }
    try {
      const res = await fetch("http://localhost:5000/auth/update",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      )
      if (!res.ok) throw new Error(`Error:${res.status} ${res.statusText}`)
      const updatedUser = await res.json();
      console.log("updated User", updatedUser.user);
      setProfile(updatedUser.user);
      setUpdate(false);

    } catch (error) {
      console.log("Error in update profile", error);
    }
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-black ">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500">
      <div className="bg-violet-400 w-105 rounded-xl shadow-2xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Profile</h2>

        <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-200 mb-4 mx-auto">
    <img
      src={user.picture}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>
        {profile.name && (
          <Field icon="👤" label="name" value={profile?.name} onChange={handleChange} name="name" editable={isUpdate} />
        )}

        {profile.email && (
          <Field icon="📧" label="Email" value={profile?.email} onChange={handleChange} name="email" editable={isUpdate} />
        )}


        {profile.contact && (
          <Field icon="📞" label="Contact" value={profile?.contact} onChange={handleChange} name="contact" editable={isUpdate} />
        )}


        <div className="mb-5">
          <label className="text-sm text-gray-600">Role</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">🎓</span>
            <span className="text-sm">{profile?.role}</span>
          </div>
        </div>


        {profile.department && (
          <div className="mb-5">
            <label className="text-sm text-gray-600">Department</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="text-gray-400 mr-2">🏢</span>
              <span className="text-sm">{profile?.department}</span>
            </div>
          </div>
        )}
        {!isUpdate &&
          <button
            onClick={handleChange}
            className="w-full mt-6 bg-amber-400 text-black py-2 rounded hover:bg-amber-700 transition hover:rounded-lg cursor-pointer"
          >
            Update Profile
          </button>
        }
        {isUpdate &&
          <button
            onClick={updateProfile}
            className="w-full mt-6 bg-green-400 text-black py-2 rounded hover:bg-green-600 transition hover:rounded-lg cursor-pointer"
          >
            Save
          </button>
        }
      </div>

    </div>
  );
}

function Field({ icon, label, value, onChange, name, editable }) {
  return (
    <div className="mb-5">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="flex items-center border-b border-gray-300 py-2">
        <span className="text-gray-400 mr-2">{icon}</span>
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          disabled={!editable}
          className={`w-full outline-none text-sm bg-transparent ${!editable ? "text-gray-500" : "text-black"
            }`}
        />
      </div>
    </div>
  );
}