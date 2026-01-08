import React, { useState, useEffect } from "react";
import CommentIssue from "./CommentIssue";
import IssueCard from "./IssueCard";

const mockIssues = [
  {
    _id: "69492cbf24afbc5118e8b71b",
    description: "Water leakage in Room 204",
    type: "Plumbing",
    location: "Block A - Room 204",
    urgency: "High",
    status: "Closed",
    assignedTo: "694924dcbe2a0087c7dc4886",
    createdAt: "2025-02-20",
    createdBy:"69492424be2a0087c7dc4881"
  },
  {
    _id: "2",
    description: "Projector not working",
    type: "IT",
    location: "Seminar Hall",
    urgency: "Medium",
    status: "Assigned",
    assignedTo: "s2",
    createdAt: "2025-02-19",
  },
  {
    _id: "3",
    description: "Broken switch board",
    type: "Electrical",
    location: "Lab 3",
    urgency: "Low",
    status: "In Progress",
    assignedTo: "s3",
    createdAt: "2025-02-18",
  },
];
const mockStaff = [
  {
    _id: "694924dcbe2a0087c7dc4886",
    name: "Rahul Sharma",
    role: "Staff",
    department: "Maintenance",
  },
  {
    _id: "s2",
    name: "Anjali Verma",
    role: "Staff",
    department: "IT",
  },
  {
    _id: "s3",
    name: "Amit Kumar",
    role: "Staff",
    department: "Electrical",
  },
];


export default function IssueSearch() {
  const [query, setQuery] = useState("");
  const [reportId, setReportId] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const[issues,setIssues] = useState();
  const[filteredIssue,setFilteredIssue] =useState() ;
  const[staff,setStaff] = useState(mockStaff);

  const handleSearch = async (e) => {
    if (!query) return;
    setReportId(query);
    setQuery("");
    await fetchIssue();
    setIsSearch(true);
  };
    const fetchIssue  = async()=>{
    const token = localStorage.getItem("token");
    if(!token) return
    try {
      const res = await fetch(`http://localhost:5000/issues/${String(query)}`,
        {
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      )
      if(!res.ok){
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data  = await res.json();
      setIssues(data);
    } catch (error) {
      console.log("failed to fetch issue",error);
    }
    }
  return (
    <div className="p-6 h-fit w-screen  bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a] text-green-500">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search issue by issueId"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-pink-600 rounded-lg hover:scale-90 cursor-pointer text-black font-semibold  px-4 "
        >
          Search
        </button>
      </div>
      {isSearch && <>
        <IssueCard issue={issues} setIssues={setIssues} staff={staff}/>
      </>
      }
    </div>
  );
}





