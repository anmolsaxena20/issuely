import React, { useEffect, useState } from "react";
import useAuth from "../AuthContext/AuthContextProvider";
import IssueCard,{StatusBadge} from "../Issue/IssueCard";

export default function AssignedIssues() {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ urgency: "", status: "", location: "" });
  const{user} = useAuth();

  useEffect(() => {
    const fetchIssue = async()=>{
      const token = localStorage.getItem("token");
      console.log("token",token);
      if(!token) return;
      try {
      const res = await fetch(`http://localhost:5000/issues/staff/my`,
        {
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      )
        if(!res.ok)  throw new Error(`Error ${res.status}: ${res.statusText}`);
        const fetchedIssues = await res.json();
        console.log("all issues",fetchedIssues);
        const filterIssue = fetchedIssues.filter(issue=>issue.assignedTo==user.id?user.id:user._id)
        console.log("filter issue in assign issue",filterIssue)
        setIssues(filterIssue);
      } catch (error) {
        console.log("Error in fetching issue in assignedissue page",error);
      }
    }
    fetchIssue()
  }, [user]);
  const filteredIssues = issues.filter(issue =>
    (!filters.urgency || issue.urgency === filters.urgency) &&
    (!filters.status || issue.status === filters.status) &&
    (!filters.location || issue.location.name.includes(filters.location))
  );

  return (
    <>
      <IssueFilters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredIssues.map(issue => (
          <IssueCard key={issue._id} issue={issue} setIssues ={setIssues} staff={user}/>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No assigned issues found
        </p>
      )}
    </>
  );
}


function IssueFilters({ filters, setFilters }) {
  return (
    <div className="bg-indigo-400 p-4 rounded-xl shadow flex gap-4 flex-wrap">
      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, urgency: e.target.value })
        }
      >
        <option value="">All Priorities</option>
        <option value = "high">High</option>
        <option value ="medium">Medium</option>
        <option value ="low">Low</option>
      </select>

      <select
        className="border p-2 rounded"
        onChange={e =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="">All Status</option>
        <option value = "received">Received</option>
        <option value = "assigned">Assigned</option>
        <option value= "in-preogress">In Progress</option>
        <option value ="resolved">Resolved</option>
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
