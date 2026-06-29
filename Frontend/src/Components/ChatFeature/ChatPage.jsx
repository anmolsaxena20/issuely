import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../Context/SocketContext";
import useAuth from "../AuthContext/AuthContextProvider";
import InfiniteScroll from "react-infinite-scroll-component";
import { apiUrl } from "../../config/api.js";
export default function IssueChatPage() {
    const { issueId } = useParams();
    const socket = useSocket();
    const { user } = useAuth();
    const currentUserId = user.id;
    console.log("current userid", currentUserId);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [hasMore, setHasMore] = useState(true);
    const [cursor, setCursor] = useState(null);

    useEffect(() => {
        if (!socket) return;
        // join room
        socket.emit("join_issue", { issueId });

        // listen for new messages
        const handleNewMessage = (msg) => {
            setMessages((prev) => [
                ...prev,
                {
                    id: msg._id,
                    senderId: String(msg.senderId),
                    text: msg.text,
                    time: new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    status: "delivered",
                },
            ]);
        };

        socket.on("new_message", handleNewMessage);

        // optional: listen for messagesSeen
        // const handleMessagesSeen = () => {
        //   setMessages((prev) =>
        //     prev.map((msg) =>
        //       msg.senderId === currentUserId
        //         ? { ...msg, status: "seen" }
        //         : msg
        //     )
        //   );
        // };
        // socket.on("messagesSeen", handleMessagesSeen);

        // cleanup
        return () => {
            socket.off("new_message", handleNewMessage);
            // socket.off("messagesSeen", handleMessagesSeen);
        };
    }, [issueId, socket]);


    const sendMessage = () => {
        if (!input.trim() || !socket) return;
        const data = {
            issueId,
            senderId: currentUserId,
            text: input,
        };
        socket.emit("send_message", data);
        setInput("");

    };
    const fetchMessage = async () => {
        if (!hasMore) return;
        const token = localStorage.getItem("token");
        if (!token) return
        const url = cursor
            ? `${apiUrl(`/issues/messages/${issueId}`)}?limit=10&before=${cursor}`
            : `${apiUrl(`/issues/messages/${issueId}`)}?limit=10`;
        const res = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        )
        if (!res.ok) throw new Error(`Error:${res.status}:${res.statusText}`)
        const data = await res.json();
        console.log("fetched message", data);
        if (data.length == 0) {
            setHasMore(false);
            return;
        }
        const normalized = data.map((msg) => ({
            id: msg._id,
            senderId: String(msg.senderId),
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
            status: "delivered",
            createdAt: msg.createdAt,
        }));
        setMessages((prev) => [...normalized, ...prev]);

        setCursor(normalized[0].createdAt);
    }
    useEffect(() => {
        fetchMessage();
    }, [])


    return (
        <div
            className="flex flex-col h-screen bg-gray-100">

            {/* HEADER */}
            <div className="bg-indigo-600 text-white p-4 flex justify-between items-center shadow">
                <div>
                    <h2 className="font-semibold">Maintenance Staff</h2>
                    <p className="text-sm opacity-90">
                        Discussing Issue: <span className="font-medium">{issueId}</span>
                    </p>
                </div>
                <span className="text-xs bg-indigo-500 px-2 py-1 rounded">
                    Online
                </span>
            </div>

            {/* CHAT BODY */}
            <div
                id="scrollableDiv"
                className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col-reverse">
                <InfiniteScroll
                    dataLength={messages.length}
                    next={fetchMessage}
                    hasMore={hasMore}
                    inverse={true}
                    scrollableTarget="scrollableDiv"
                 loader={<p className="text-center text-sm">Loading message</p>}
                >
                <div className="flex flex-col space-y-3">
                    {messages.map((msg) => {
                        const isSender = String(msg.senderId) === String(currentUserId);

                        return (
                            <div
                                key={msg._id}
                                className={`flex mb-5 ${isSender ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-xs md:max-w-md px-4 py-2 space-y-3 rounded-lg text-sm shadow ${isSender
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white text-gray-800 rounded-bl-none"
                                        }`}
                                >
                                    <p>{msg.text} {isSender &&
                                        <span className="text-xs ml-2">
                                            {msg.status === "sent" && "✔"}
                                            {msg.status === "delivered" && "✔✔"}
                                            {msg.status === "seen" && (
                                                <span className="text-blue-500">✔✔</span>
                                            )}
                                        </span>
                                    }
                                    </p>
                                    <span className="block text-xs mt-1 opacity-70 text-right">
                                        {msg.time}
                                    </span>

                                </div>
                            </div>
                        );
                    })}
                    </div>
                </InfiniteScroll>
                <div />
            </div>

            {/* INPUT */}
            <div className="bg-white p-3 flex items-center gap-2 border-t">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                    onClick={sendMessage}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
