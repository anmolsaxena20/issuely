import React,{ useState, useEffect } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    userName: "",
    fullName: "",
    email: "",
    contact: "",
    role: "",
    department: "",
    // userName:"Gaurav",
    // fullName:"Gaurav Dubey",
    // email:"g@gmail.com",
    // contact:"+91944",
    // role:"Student",
    // department:"Ece"
  });


  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });


        const data = await res.json();
        setProfile(data); // backend decides which fields exist
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };


    fetchProfile();
  }, []);
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500">
      <div className="bg-white w-105 rounded-xl shadow-2xl px-8 py-10">
        <h2 className="text-2xl font-bold text-center mb-8">Profile</h2>


        {profile.userName && (
          <Field icon="👤" label="Username" value={profile.userName} onChange={handleChange} name="userName" />
        )}


        {profile.fullName && (
          <Field icon="📝" label="Full Name" value={profile.fullName} onChange={handleChange} name="fullName" />
        )}


        {profile.email && (
          <Field icon="📧" label="Email" value={profile.email} onChange={handleChange} name="email" />
        )}


        {profile.contact && (
          <Field icon="📞" label="Contact" value={profile.contact} onChange={handleChange} name="contact" />
        )}


        <div className="mb-5">
          <label className="text-sm text-gray-600">Role</label>
          <div className="flex items-center border-b border-gray-300 py-2">
            <span className="text-gray-400 mr-2">🎓</span>
            <span className="text-sm">{profile.role}</span>
          </div>
        </div>


        {profile.department && (
          <div className="mb-5">
            <label className="text-sm text-gray-600">Department</label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <span className="text-gray-400 mr-2">🏢</span>
              <span className="text-sm">{profile.department}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ icon, label, value, onChange, name }) {
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
          readOnly
          className="w-full outline-none text-sm"
        />
      </div>
    </div>
  );
}