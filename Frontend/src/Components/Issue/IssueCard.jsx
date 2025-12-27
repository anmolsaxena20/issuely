import React, { useEffect, useState } from "react";
import useAuth from "../AuthContext/AuthContextProvider";
import FeedbackForm from "./FeedbackForm";
import IssueChatPage from "../ChatFeature/ChatPage";
import { Link } from "react-router-dom";



export default function IssueCard({ issue, setIssues, staff }) {
    const { role, isLogin,user } = useAuth();
    console.log("issue in card", issue)
    const [isUpdate, setIsUpdate] = useState(false);
    const[reports,setReports] = useState(issue);
    const issueId = issue._id;
    const fetchIssues = async () => {
        // try {
        //     const token = localStorage.getItem("token");

        //     const response = await fetch("http://localhost:5000/issues", {
        //         headers: {
        //             Authorization: `Bearer ${token}`
        //         }
        //     });

        //     const data = await response.json();
        //     setReports(data);
        // } catch (error) {
        //     console.error("Failed to fetch issues", error);
        // }
        issue = reports.find(r=>r._id==issueId);
    };

    const updateIssueStatus = async (issueId, newStatus, setIssues) => {
        //   try {
        //     const token = localStorage.getItem("token");

        //     const response = await fetch(`/issues/${issueId}`, {
        //       method: "PATCH",
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${token}`,
        //       },
        //       body: JSON.stringify({ status: newStatus }),
        //     });

        //     if (!response.ok) {
        //       throw new Error("Failed to update issue");
        //     }

        //     const updatedIssue = await response.json();


        //     setIssues(updatedIssue);
        //   } catch (error) {
        //     console.error("Error updating issue:", error);
        //     alert("Unable to update issue status");
        //   }

        setReports(prevIssues =>
            prevIssues.map((issue) => issue._id === issueId ? { ...issue, status: newStatus } : issue))

    }
    const filteredStaff = staff.find(s => s._id == issue.assignedTo);

    return (
        <div
            className="bg-blue-300 p-4 rounded-xl shadow hover:shadow-2xl transition h-fit"
        >
            <div className="flex justify-between">
                <h3 className="font-semibold text-blue-600">
                    ID:{issue._id}
                </h3>
                <StatusBadge status={issue.status} />
            </div>

            <p className="text-gray-700 mt-2">{issue.type}</p>
            <p className="text-sm text-gray-500">{issue.location}</p>
            <p className="text-sm text-gray-500">Assigned to:<span className="text-red-400 font-bold">{filteredStaff ? filteredStaff.name : "Not assigned yet"}</span></p>


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

            {(role != "student" && isLogin) &&
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
                                <option>Assigned</option>
                                <option>In Progress</option>
                                <option>Resolved</option>
                                <option>Closed</option>
                            </select>
                            <button
                                className="border p-2 w-20 rounded bg-green-300 cursor-pointer hover:bg-green-500"
                                onClick={() => setIsUpdate(false)}
                            >Save </button>
                        </div>

                    }
                </>
            }
            {(role=="student" || role=="staff") && (isLogin && (issue.createdBy==user.id || issue.assignedTo==user.id))&& 
            <Link to ={`/issues/${issue._id}/chat`}>
                chat on this issue
            </Link>}
            {(role == "student" && (isLogin && (issue.status == 'Closed' || issue.status == 'Resolved'))) &&
                <FeedbackForm
                    issueId={issue._id}
                    onSuccess={() => {
                        // re-fetch issues OR update local state
                        fetchIssues();
                    }}
                />


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
