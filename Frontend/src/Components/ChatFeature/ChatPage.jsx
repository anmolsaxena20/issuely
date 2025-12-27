import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../../Context/SocketContext";
import useAuth from "../AuthContext/AuthContextProvider";
export default function IssueChatPage() {
    //const currentUserId = "user123"; // logged-in user
    const { issueId } = useParams();
    const socket = useSocket();
    const { user } = useAuth();
    const currentUserId = user.id;
    console.log("current userid", currentUserId);

    // const issueId = "ISSUE-101";

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
            console.log({
                msgSender: msg.senderId,
                currentUserId,
                equal: String(msg.senderId) === String(currentUserId)
            });
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


    const [messages, setMessages] = useState([
        // {
        //     id: 1,
        //     senderId: user.id,
        //     senderName: "You",
        //     text: "Hello, any update on this issue?",
        //     time: "10:30 AM",
        //     status: "seen",
        // },
        // {
        //     id: 2,
        //     senderId: "staff456",
        //     senderName: "Maintenance Staff",
        //     text: "Yes, we are checking it right now.",
        //     time: "10:32 AM",
        //     status: "delivered"
        // },
        // {
        //     id: 3,
        //     senderId: "69492424be2a0087c7dc4881",
        //     senderName: "You",
        //     text: "Thanks! Please let me know.",
        //     time: "10:33 AM",
        //     status: "sent"
        // }
    ]);

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim() || !socket) return;
        const data = {
            issueId,
            senderId: currentUserId,
            text: input,
        };
        socket.emit("send_message", data);
        setInput("");

        ///////////////////////////Testing*******************************************

        // setMessages((prev) => [
        //     ...prev,
        //     {
        //         id: Date.now(),
        //         senderId: currentUserId,
        //         text: input,
        //         time: new Date().toLocaleTimeString([], {
        //             hour: "2-digit",
        //             minute: "2-digit"
        //         })
        //     }
        // ]);

    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">

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
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => {
                    const isSender = String(msg.senderId) === String(currentUserId);

                    return (
                        <div
                            key={msg.id}
                            className={`flex ${isSender ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm shadow ${isSender
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
