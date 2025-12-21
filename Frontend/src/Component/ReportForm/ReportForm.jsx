import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  });

  const [file, setFile] = useState(null)
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    // when we want to send the data in text and file both format then we need to send it in form data
    const formData = new FormData();
    formData.append("issueType", form.issueType);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("urgency", form.urgency);
    formData.append("contact", form.contact);

    if (file) {
      formData.append("attachment", file);
    }

    const res = await fetch("http://localhost:3000/issues", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 max-w-lg mx-auto bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 backdrop-blur-md p-6 rounded-2xl"
    >
      <h2 className="text-xl font-semibold mb-4">Report an Issue
      </h2>
      <Link to="/qrscanner"> <ScanQrCode className="flex justify-between w-full ml-50"/></Link>
      {/* personal detail optional */}
      <input
        type="text"
        name="name"
        placeholder="Your name(Optional)"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded outline-none"
      />

      {/* Issue Type */}
      <select
        name="issueType"
        value={form.issueType}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded outline-none "
      >
        <option value="" className="bg-blue-400">Select Issue Type</option>
        <option value="infrastructure" className="bg-blue-400 ">Infrastructure</option>
        <option value="hostel" className="bg-blue-400">Hostel</option>
        <option value="academic" className="bg-blue-400">Academic</option>
        <option value="safety" className="bg-blue-400">Safety</option>
        <option value="other" className="bg-blue-400">Other</option>
      </select>

      {/* Description */}
      <textarea
        name="description"
        placeholder="Describe the issue"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 mb-3 rounded outline-none"
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
        className="w-full p-2 mb-3 rounded outline-none"
      />

      {/* Urgency */}
      <select
        name="urgency"
        value={form.urgency}
        onChange={handleChange}
        className="w-full p-2 mb-3 rounded outline-none"
      >
        <option value="" className="bg-blue-400">Select Urgency</option>
        <option value="low" className="bg-blue-400">Low</option>
        <option value="medium" className="bg-blue-400">Medium</option>
        <option value="high" className="bg-blue-400">High</option>
      </select>

      {/* Optional Contact */}
      <input
        type="text"
        name="contact"
        placeholder="Contact info (optional)"
        value={form.contact}
        onChange={handleChange}
        className="w-full p-2 mb-4 rounded outline-none"
      />

      {/* file upload */}

      <label className="mr-45" >upload a picture related to your issue:</label>
      <input
        type="file"
        accept="image/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full my-[0.4rem] mx-0 text-sm mb-4 ml-4 "
      />


      <button className="w-full py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700">
        Submit Report
      </button>
    </form>
  );
}







