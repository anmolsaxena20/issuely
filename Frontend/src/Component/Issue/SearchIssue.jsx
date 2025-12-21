import React, { useState, useEffect } from "react";
import CommentIssue from "./CommentIssue";

export default function IssueSearch() {
  const [query, setQuery] = useState("");
  const [reportId, setReportId] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = async (e) => {
    if (!query) return;
    setReportId(query);
    setQuery("");
    setIsSearch(true);

  };

  return (
    <div className="p-6 h-fit w-screen  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-white">
      <div className="flex gap-2 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search issue by issueId"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Search
        </button>
      </div>
      {isSearch && <>
        <ReportDetails reportId={reportId} />
      </>
      }
    </div>
  );
}






const STATUS_FLOW = [
  "RECEIVED",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED",
];
const STATUS_LABELS = {
  RECEIVED: "Received",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

function ReportDetails({ reportId }) {
  const [report, setReport] = useState(null);
  useEffect(() => {
    fetch(`/api/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setReport);

    // const report = [  // for testing
    //   {
    //     id: "1",
    //     title: "hostle issue",
    //     location: "Patel",
    //     updatedAt: Date.now(),
    //     status: "ASSIGNED"
    //   }, {
    //     id: "2",
    //     title: "Class issue",
    //     location: "ECED",
    //     updatedAt: Date.now(),
    //     status: "IN_PROGRESS"
    //   }
    // ]

    const data = report.find((data) => data.id === reportId);

    if (data) {
      console.log(data);
      setReport(data);
    } else {
      setReport(""); 
    }

  }, [reportId]);


  if (!report) return <p>Not Found! Please enter valid issue id</p>;

  return (
    <div className="min-h-screen  p-6  h-fit  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-black">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Issue Report</h2>

        <div className="bg-white p-4 rounded-xl bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500">
          <p><strong>ID:</strong> {reportId}</p>
          <p><strong>Title:</strong> {report.title}</p>
          <p><strong>Location:</strong> {report.location}</p>
          <p><strong>Last Updated:</strong> {new Date(report.updatedAt).toLocaleString()}</p>
        </div>

        <ReportStatus currentStatus={report.status} reportId={reportId} />
      </div>
    </div>
  );
}


function ReportStatus({ currentStatus, reportId }) {
  const currentIndex = STATUS_FLOW.indexOf(currentStatus);

  return (
    <div className=" rounded-xl p-6 shadow-md  h-fit  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 text-white">
      <h3 className="text-lg font-semibold mb-4">Report Status</h3>

      <div className="flex justify-between items-center">
        {STATUS_FLOW.map((status, index) => {
          const isCompleted = index <= currentIndex;

          return (
            <div key={status} className="flex-1 text-center relative">
              {/* Line */}
              {index !== 0 && (
                <div
                  className={`absolute top-4 left-0 w-full h-1 -z-10 ${isCompleted ? "bg-green-500" : "bg-gray-300"
                    }`}
                />
              )}

              {/* Circle */}
              <div
                className={`mx-auto w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-600"
                  }`}
              >
                ✓
              </div>

              {/* Label */}
              <p className="text-xs mt-2">
                {STATUS_LABELS[status]}
              </p>
            </div>
          );
        })}

      </div>
      <CommentIssue reportId={reportId} />
    </div>
  );
}