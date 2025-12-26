import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignIssue from "./AssignIssue";
import IssueCard from "../Issue/IssueCard";

/////////********* testing **********/

const mockStaff = [
  {
    _id: "s1",
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

const mockIssues = [
  {
    _id: "i1",
    description: "Water leakage in Room 204",
    type: "Plumbing",
    location: "Block A - Room 204",
    urgency: "High",
    status: "Open",
    assignedTo: null,
    createdAt: "2025-02-20",
  },
  {
    _id: "i2",
    description: "Projector not working",
    type: "IT",
    location: "Seminar Hall",
    urgency: "Medium",
    status: "Assigned",
    assignedTo: "s2",
    createdAt: "2025-02-19",
  },
  {
    _id: "i3",
    description: "Broken switch board",
    type: "Electrical",
    location: "Lab 3",
    urgency: "Low",
    status: "In Progress",
    assignedTo: "s3",
    createdAt: "2025-02-18",
  },
];
  const testSample = [
    {
      _id: "ISSUE-101",
      type: "Electrical",
      priority: "High",
      location: "Block A - Room 203",
      date: "2025-02-12",
      status: "Closed",
      assignedTo: "s2",
    },
    {
      _id: "ISSUE-102",
      type: "Plumbing",
      priority: "Medium",
      location: "Hostel - Floor 1",
      date: "2025-02-11",
      status: "Assigned",
      assignedTo: null,
    },
  ];



export default function AdminDashboard() {
    const [issues, setIssues] = useState([]);
    const [staff, setStaff] = useState([]);
    const [filters, setFilters] = useState({
        status: "",
        location: "",
        urgency: "",
    });

    useEffect(() => {
        // const fetchIssues = async () => {
        //     await fetch("/issues")
        //     .then(res=>res.json())
        //     .then(setIssues)
        // };
        // const fetchStaff = async()=>{
        //     await fetch("/staff")
        //     .then(res=>res.json())
        //     .then(setStaff)
        // }
        setIssues(testSample);
        setStaff(mockStaff);
    }, []);

    const filteredIssues = issues.filter(issues =>
        (!filters.status || issues.status === filters.status) &&
        (!filters.location || issues.location.includes(filters.location)) &&
        (!filters.priority || issues.priority === filters.priority) 
       
    );

    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-600 to-purple-600 p-6">
            <div className="flex mb-6">
            <h1 className="text-3xl font-bold text-white ">
                Admin Dashboard
            </h1>
            <h3 className=" flex text-fuchsia-400 ml-10 mt-2"><Link to="/assign">click here to assign issue to staff</Link></h3>
            </div>
            <IssueFilters filters={filters} setFilters={setFilters} />

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {filteredIssues.map(issue => (
          <IssueCard key={issue.issueId} issue={issue} setIssues ={setIssues} staff={staff}/>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <p className="text-center text-black text-2xl mt-6">
          No  issues found...
        </p>
      )}
        </div>
    );
}


function IssueFilters({ filters, setFilters }) {
  return (
    <div className="bg-indigo-400 p-4 rounded-xl shadow flex gap-4 flex-wrap">
      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, priority: e.target.value })
        }
      >
        <option value="">All Priorities</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option>Received</option>
        <option>Assigned</option>
        <option>In Progress</option>
        <option>Resolved</option>
      </select>
      <input
        type="text"
        placeholder="Search by location"
        className="border p-2 rounded"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}

      />
    </div>
  );
}




