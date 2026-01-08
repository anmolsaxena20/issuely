import React, { useEffect, useState } from "react";
import useAuth from "../AuthContext/AuthContextProvider";
import FeedbackForm from "./FeedbackForm";
import IssueChatPage from "../ChatFeature/ChatPage";
import { Link } from "react-router-dom";



export default function IssueCard({ issue, setIssues, staff }) {
    const { role, isLogin,user } = useAuth();
    console.log("issue in card", issue);
    console.log("user in issue card",user);
    const [isUpdate, setIsUpdate] = useState(false);
    const[isExpanded,setIsExpanded] = useState(false);
    const handleSize = async()=>{
        setIsExpanded(!isExpanded);
    }

   const updateIssueStatus = async (issueId, newStatus, setIssues) => {
          try {
            const token = localStorage.getItem("token");

            const response = await fetch(`http://localhost:5000/issues/admin/update`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ id:issueId,status: newStatus }),
            });

            if (!response.ok) {
              throw new Error("Failed to update issue");
            }

            const updatedIssue = await response.json();
            console.log("updated issue in issue card",updatedIssue);
            setIssues(previssues=>previssues.map(i=>i._id==issueId?updatedIssue:i));
          } catch (error) {
            console.error("Error updating issue:", error);
            alert("Unable to update issue status");
          }
   }
   let filteredStaff;
   if(!Array.isArray(staff)){
    filteredStaff = staff
   }else  {
    filteredStaff = staff.find(s => s._id?s._id:s.id == issue.assignedTo);
   }
   console.log("filteredStaff",filteredStaff)

    return (
        <div
            className="bg-[#0F1A1C] border border-[#16B4C6]/20 p-4 rounded-xl shadow hover:shadow-2xl transition h-fit"
        >
            <div className="flex justify-between">
                <h3 className="font-semibold text-blue-600">
                    ID:<span className="text-pink-500">{issue._id}</span>
                </h3>
                <StatusBadge status={issue.status} />
            </div>

            <p className="text-gray-700 mt-2">{issue.type}</p>
            <p className="text-sm text-gray-500">{issue.location.name}</p>
            <p className="text-sm text-gray-500">Assigned to:<span className="text-red-400 font-bold">{filteredStaff ? filteredStaff.name : "Not assigned yet"}</span></p>
            <p className="text-sm text-gray-500"><span className="text-red-400 text-lg">Description:  </span>{issue.description}</p>
            <span className="text-red-500 text-lg">IssueImage: </span>
            <div 
                style={{width:isExpanded?"auto":"100px",height:isExpanded?"auto":"100px"}}
                onClick={handleSize}
            >
            <img src={issue.picture} alt="issueImage" 
                style={{width:isExpanded?"100%":"100%",height:isExpanded?"100%":"100%",objectFit:"contain"}}
            />
            </div>

            <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded ${issue.priority === "high"
                    ? "bg-red-100 text-red-600"
                    : issue.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-600"
                    }`}
            >
                {issue.priority}
            </span>

            {(role != "student" && (isLogin && ((issue.assignedTo!=null)&& (issue.assignedTo==user.id?user.id:user._id  || role=="lead")))) &&
                <>
                    <div>
                        <button
                            className="mt-2 border p-2 w-30 rounded bg-blue-400 cursor-pointer hover:bg-blue-600"
                            onClick={() => setIsUpdate(true)}
                        >Update Issue</button>
                    </div>
                    {
                        isUpdate &&
                        <div className="p-2 flex-wrap inline-block ">
                            <select
                                value={issue.status}
                                onChange={(e) =>
                                    updateIssueStatus(issue._id, e.target.value, setIssues)
                                }
                                className="border p-2 rounded m-2 bg-blue-300"
                            >
                                <option value="assigned">Assigned</option>
                                <option value="in-progress">In Progress</option>
                                <option value ="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                            <button
                                className="border p-2 w-20 rounded bg-green-300 cursor-pointer hover:bg-green-500"
                                onClick={() => setIsUpdate(false)}
                            >Save </button>
                        </div>

                    }
                </>
            }
            <div>
            {(role=="student" || role=="staff") && (isLogin && (issue.createdBy==user.id?user.id:user._id || issue.assignedTo==user.id?user.id:user._id))&& 
            <Link to ={`/issues/${issue._id}/chat`}>
                chat on this issue
            </Link>}
            </div>
            {(role == "student" && (isLogin && (issue.status == 'Closed' || issue.status == 'Resolved'))) &&
                <FeedbackForm
                    issueId={issue._id}
                    onSuccess={() => {
                        // re-fetch issues OR update local state
                        //fetchIssues();
                    }}
                />


            }
        </div>
    );
}


export const StatusBadge=({ status })=> {
    const colors = {
        received: "bg-gray-300 text-gray-800",
        assigned: "bg-blue-200 text-blue-800",
        'in-progress': "bg-yellow-200 text-yellow-800",
        resolved: "bg-green-200 text-green-800",
        closed: "bg-red-300 text-red-800"
    };

    return (
        <span
            className={`px-2 py-1 text-xs rounded ${colors[status]}`}
        >
            {status}
        </span>
    );
}
