import React, { useEffect, useState } from "react";
import useSocket from "../../Context/SocketContext";
import {Toaster} from "react-hot-toast"
import useAuth from "../AuthContext/AuthContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
export default function LeadRequestsPage() {
    const socket = useSocket();
    const{user}  = useAuth();
    const [requests, setRequests] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(null);
    const fetchRequest = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
            const url = cursor ? `http://localhost:5000/lead/prevreqs?limit=10&before=${cursor}` : `http://localhost:5000/lead/prevreqs?limit=10`
            const res = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "COntent-Type": "application/json"
                    }
                }
            )
            if (!res.ok) throw new Error(`error in ${res.status}: ${res.statusText}`);
            const fetchedRequest = await res.json();
            if (fetchedRequest.lenght == 0) setHasMore(false);
            console.log("fetched request from db",fetchedRequest);
            setRequests((prev) => [...fetchedRequest, ...prev]);
            setCursor(fetchedRequest[0].createdAt);
        } catch (error) {
            console.log("Error in fetching the prev request", error);
        }
    }
    useEffect(async () => {
        fetchRequest();
    }, [requests])

    useEffect(() => {
       if(!socket || user?.role!=="lead") return;

        // Receive new staff request
        socket.on("new_request", (request) => {
            Toaster.success(`new staff signup request has come`,{icon: "🔔",duration:4000})
            setRequests((prev) => [request, ...prev]);
        });

        return () => {
            socket.off("new_request");
        };
    }, [socket,user]);

    const approveRequest = async (req) => {

        try {
            const token = localStorage.getItem("token");
            if (!token) return
            const res = await fetch("http://localhost:5000/lead/accept",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: req._id })
                }
            )
            if (!res.ok) throw new Error(`error in ${res.status}: ${res.statusText}`);
            removeRequest(req._id);

        } catch (error) {
            console.log("Error in approving the request", error);
        }
    };

    const rejectRequest = async (req) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await fetch("http://localhost:5000/lead/reject",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "COntent-Type": "application/json"
                    },
                    body: ({ id: req._id })
                }
            )
            if (!res.ok) throw new Error(`error in ${res.status}: ${res.statusText}`);
            removeRequest(req._id);

        } catch (error) {
            console.log("Error in rejecting the signup issue", error);
        }
    };

    const removeRequest = (id) => {
        setRequests((prev) => prev.filter((r) => r._id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6">
                Staff Signup Requests
            </h2>

            {requests.length === 0 && (
                <p className="text-gray-500">No pending requests</p>
            )}
            <div 
            id="scrollableDiv" 
            className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col-reverse"
            >
            <InfiniteScroll
                dataLength={requests.length}
                next={fetchRequest }
                hasMore={hasMore}
                inverse={true}
                scrollableTarget="scrollableDiv"
                loader={<p className="text-center text-sm">Loading Requests</p>}
            >
                <div className="space-y-4" id="">
                    {requests.map((req) => (
                        <div
                            key={req._id}
                            className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
                        >
                            <div>
                                <p className="font-semibold">{req.name}</p>
                                <p className="text-sm text-gray-600">{req.email}</p>
                                <p className="text-sm text-gray-500">
                                    Dept: {req.department}
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => approveRequest(req)}
                                    className="bg-green-600 text-white px-4 py-1 rounded"
                                >
                                    Approve
                                </button>

                                <button
                                    onClick={() => rejectRequest(req)}
                                    className="bg-red-600 text-white px-4 py-1 rounded"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
            <Toaster position="top-right" reverseOrder={false} />
            </div>
        </div>
    );
}
