import React, { useState ,useEffect} from "react";
import { Link } from "react-router-dom";

export default function AssignIssuesPage() {
    const [issues, setIssues] = useState([]);
    const [staff, setStaff] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("");

    const unassignedIssues = issues.filter(
        issue => issue.assignedTo === null
    );

    const filteredStaff = staff.filter(s =>
        (!department || s.department === department) &&
        s.name.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        const fetchIssues = async () => {
            const token = localStorage.getItem("token")
            if (!token) return;
            try {
                const res = await fetch("http://localhost:5000/issues/lead/getall",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                )
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
                const issue = await res.json();
                console.log("issue in assigned issue admin", issue);
                setIssues(issue);
                const unasignedIssue = issue.filter(i => i.assignedTo === null);
                console.log("unassigned issues", unasignedIssue);
            } catch (error) {
                console.log("Error while fetching issue in admin side", error);
            }
        }
        const fetchStaff = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await fetch("http://localhost:5000/lead/getstaff",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );
                if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
                const staff = await res.json();
                console.log("staff in assigned issue", staff);
                setStaff(staff);
            } catch (error) {
                console.log("Error in fetching staff", error);
            }
        }
        fetchStaff();
        fetchIssues();
    }, [])

       const assignIssue = async (staffId) => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `http://localhost:5000/issues/lead/assign`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ handler:staffId ,id:selectedIssue._id}),
            }
        );

        if (!res.ok) {
            alert("Assignment failed");
            return;
        }

        const updatedIssue = await res.json();

        setIssues(prev =>
            prev.map(i => (i._id === updatedIssue._id ? updatedIssue : i))
        );
        setSelectedIssue(null);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-[#011119] via-[#0f2a2f] to-[#0e6f7a]  p-6">
            <div className="flex mb-6 border p-4 rounded-lg bg-fuchsia-800">
                <h1 className="text-3xl font-bold text-white ">
                    Assign Issue
                </h1>
                <h3 className=" flex text-fuchsia-500 ml-10 mt-2"><Link to="/admin">Back to Admin Dashboard</Link></h3>
            </div>
            <div className="grid grid-cols-2 gap-6 h-fit">

                {/* LEFT – UNASSIGNED ISSUES */}
                <div className="bg-emerald-300 rounded-xl p-4 shadow">
                    <h2 className="text-xl font-semibold mb-4">
                        Unassigned Issues
                    </h2>
                    {unassignedIssues.length == 0 && <p className="font-semibold">No unassigned issue is available</p>}
                    {unassignedIssues.lenght != 0 && unassignedIssues.map(issue => (
                        <div
                            key={issue._id}
                            className={`p-3 mb-3 rounded border cursor-pointer ${selectedIssue?._id === issue._id
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200"
                                }`}
                            onClick={() => setSelectedIssue(issue)}
                        >
                            <p className="font-semibold">ID: <span className="text-red-500">{issue._id}</span></p>
                            <p className="text-sm">{issue.issueType}</p>
                            <p className="text-xs text-gray-500">{issue.location.name}</p>
                            <span className="text-xs text-red-600">
                                {issue.priority}
                            </span>
                        </div>
                    ))}
                </div>

                {/* RIGHT – STAFF PANEL */}
                <div className="bg-blue-300 rounded-xl p-4 shadow h-fit">
                    <h2 className="text-xl font-semibold mb-4">
                        Staff List
                    </h2>

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Search staff name..."
                        className="border p-2 w-full mb-3 rounded"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />

                    {/* FILTER */}
                    <select
                        className="border p-2 w-full mb-4 rounded"
                        value={department}
                        onChange={e => setDepartment(e.target.value)}
                    >
                        <option value="">All Departments</option>
                        <option value="Maintenance">Maintainance</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Sweeper">Sweeper</option>
                        <option value="IT">IT</option>
                    </select>

                    {selectedIssue ? (
                        filteredStaff.map(s => (
                            <div
                                key={s._id}
                                className="flex justify-between items-center border p-3 rounded mb-2"
                            >
                                <div>
                                    <p className="font-medium">{s.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {s.department}
                                    </p>
                                </div>

                                <button
                                    onClick={() => assignIssue(s._id)}
                                    className="bg-green-400 text-white px-3 py-1 rounded hover:bg-green-600 cursor-pointer"
                                >
                                    Assign
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">
                            Select an issue to assign
                        </p>
                    )}
                </div>

            </div>
        </div>
    );
}
