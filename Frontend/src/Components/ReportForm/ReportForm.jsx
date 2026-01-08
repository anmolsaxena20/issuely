import React, { useState } from "react";
import { useSearchParams ,useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { ScanQrCode } from "lucide-react";


export default function ReportIssue() {
  const [form, setForm] = useState({
    name: "",
    issueType: "",
    description: "",
    location: "",
    urgency: "Select Urgency",
    contact: "",
    lat:"",
    lng:"",
    status:""
  });

  const [file, setFile] = useState(null)
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");
  const navigate = useNavigate();


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // when we want to send the data in text and file both format then we need to send it in form data
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("issueType", form.issueType);
    formData.append("description", form.description);
    formData.append("locationName", form.location);
    formData.append("urgency", form.urgency);
    formData.append("contact", form.contact);
    formData.append("status",formData.status || "received");
    formData.append("lat",formData.lat || 1);
    formData.append("lng",formData.lng||1);


    if (file) {
      formData.append("picture", file);
    }
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:5000/issues/student", {
      method: "POST",
      headers: { "Authorization": `Bearer ${token}`},
      body: formData,
    });

    const data = await res.json();
    if(!res.ok) alert(data.message);
    console.log(data)
    navigate("/");
  };


  return (
    <div className="min-h-screen w-screen flex items-center p-6  justify-center  bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a] ">
    <form
      onSubmit={handleSubmit}
       className="bg-[#15979711] w-full h-full flex flex-col justify-center  max-w-4xl rounded-2xl shadow-2xl overflow-hidden"
    >
      <h2 className="text-xl text-pink-400 flex justify-center font-semibold m-4">Report an Issue
      <ScanQrCode onClick={()=>navigate("/qrscanner")} className="ml-50 cursor-pointer"/>
      </h2>
    
      {/* personal detail optional */}
      <input
        type="text"
        name="name"
        placeholder="Enter Your name(Optional)"
        value={form.name}
        onChange={handleChange}
        className="w-full   p-2 mb-3 text-amber-300 rounded outline-none"
      />

      {/* Issue Type */}
      <select
        name="issueType"
        value={form.issueType}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded outline-none text-amber-300"
      >
        <option value="" className="bg-gray-600">Select Issue Type</option>
        <option value="infrastructure" className="bg-gray-600 ">Infrastructure</option>
        <option value="hostel" className="bg-gray-600">Hostel</option>
        <option value="academic" className="bg-gray-600">Academic</option>
        <option value="safety" className="bg-gray-600">Safety</option>
        <option value="other" className="bg-gray-600">Other</option>
      </select>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Describe the issue"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded outline-none text-green-600"
        rows="4"
      />

      {/* Location */}
      <input
        type="text"
        name="location"
        placeholder="Location (Block / Room / Area)"
        value={location ||form.location}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded outline-none text-amber-300"
      />

      {/* Urgency */}
      <select
        name="urgency"
        value={form.urgency}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded outline-none text-amber-300"
      >
        <option value="" className="bg-gray-600">Select Urgency</option>
        <option value="low" className="bg-gray-600">Low</option>
        <option value="medium" className="bg-gray-600">Medium</option>
        <option value="high" className="bg-gray-600">High</option>
      </select>

      {/* Optional Contact */}
      <input
        type="text"
        name="contact"
        placeholder="Contact info (optional)"
        value={form.contact}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded outline-none text-amber-300"
      />

      {/* file upload */}

      <label className="ml-2 text-amber-300" >upload a picture related to your issue:</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full my-[0.4rem] mx-0 scale-100 text-sm mb-4 ml-4  text-pink-400 cursor-pointer"
      />


      <button className=" py-2 bg-linear-to-b from-pink-400  to-violet-400 hover:scale-90 rounded-xl text-black  cursor-pointer hover:bg-purple-700 ">
        Submit Report
      </button>
    </form>
    </div>
  );
}







