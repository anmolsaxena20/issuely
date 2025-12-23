import React, { useEffect, useState } from "react";

export default function AssignedIssues() {
  const [issues, setIssues] = useState([]);
  const [filters, setFilters] = useState({ priority: "", status: "", location: "" });

  
  useEffect(() => {
   // Backend already returns ONLY assigned issues
    fetch("/issues", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then((issue)=>setIssues(issue));
   // setIssues(testSample);  ******for testing
  }, []);

  // const testSample = [
  //   {
  //     id: "ISSUE-101",
  //     type: "Electrical",
  //     priority: "High",
  //     location: "Block A - Room 203",
  //     date: "2025-02-12",
  //     status: "Closed",
  //   },
  //   {
  //     id: "ISSUE-102",
  //     type: "Plumbing",
  //     priority: "Medium",
  //     location: "Hostel - Floor 1",
  //     date: "2025-02-11",
  //     status: "Assigned",
  //   },
  // ];




  const filteredIssues = issues.filter(issue =>
    (!filters.priority || issue.priority === filters.priority) &&
    (!filters.status || issue.status === filters.status) &&
    (!filters.location || issue.location.includes(filters.location))
  );

  return (
    <>
      <IssueFilters filters={filters} setFilters={setFilters} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {filteredIssues.map(issue => (
          <IssueCard key={issue.issueId} issue={issue} setIssues ={setIssues} />
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




function IssueCard({ issue ,setIssues}) {
  const [isUpdate, setIsUpdate] = useState(false);
  const updateIssueStatus = async(issueId, newStatus, setIssues)=>{
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`/api/issues/${issueId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update issue");
    }

    const updatedIssue = await response.json();

   
    setIssues(updatedIssue);
  } catch (error) {
    console.error("Error updating issue:", error);
    alert("Unable to update issue status");
  }

  setIssues(prevIssues=>
    prevIssues.map((issue)=>issue.id===issueId?{...issue,status:newStatus}:issue))

  }
  return (
    <div
      className="bg-blue-200 p-4 rounded-xl shadow hover:shadow-lg transition"
    >
      <div className="flex justify-between">
        <h3 className="font-semibold text-blue-600">
          {issue.id}
        </h3>
        <StatusBadge status={issue.status} />
      </div>

      <p className="text-gray-700 mt-2">{issue.type}</p>
      <p className="text-sm text-gray-500">{issue.location}</p>

      <span
        className={`inline-block mt-3 px-2 py-1 text-xs rounded ${issue.priority === "High"
            ? "bg-red-100 text-red-600"
            : issue.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-600"
          }`}
      >
        {issue.priority}
      </span>
      <div>
        <button
          className="mt-2 border p-2 w-30 rounded bg-green-300 cursor-pointer hover:bg-green-500"
          onClick={() => setIsUpdate(true)}
        >Update Issue</button>
      </div>
      {
        isUpdate &&
        <div className="p-2 flex-wrap inline-block ">
        <select
          value={issue.status}
          onChange={(e) =>
            updateIssueStatus(issue.id, e.target.value, setIssues)
          }
          className="border p-2 rounded m-2 bg-blue-100"
        >
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <button
        className="border p-2 w-20 rounded bg-green-300 cursor-pointer hover:bg-green-500"
        onClick={()=>setIsUpdate(false)}
        >Save </button>
        </div>

      }
    </div>
  );
}



function StatusBadge({ status }) {
  const colors = {
    Received: "bg-gray-300 text-gray-800",
    Assigned: "bg-blue-200 text-blue-800",
    'In Progress': "bg-yellow-200 text-yellow-800",
    Resolved: "bg-green-200 text-green-800",
    Closed: "bg-red-300 text-red-800"
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded ${colors[status]}`}
    >
      {status}
    </span>
  );
}


