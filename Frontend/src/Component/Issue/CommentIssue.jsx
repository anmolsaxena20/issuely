
import React, { useEffect, useState } from "react";

export default function CommentIssue({ reportId }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/issues/${issueId}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(res => res.json())
      .then(setComments);

    //*************for testing *******/
    // const comment = [
    //   {
    //     id: "1",
    //     message: "the issue is still there",
    //     senderName: "Gaurav",
    //     senderRole: "Student",

    //   },
    //   {
    //     id: "1",
    //     message: "we have resolved the issue please check again",
    //     senderName: "Anmol ",
    //     senderRole: "Staff",
    //   }
    // ]
    setComments(comments);
  
  }, [reportId]);

  const sendComment = async () => {
    await fetch(`/api/issues/${issueId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message }),
    });
    if (!message) return;
    // const comment =
    // {
    //   message: `${message}`,
    //   senderName: "Gaurav",
    //   senderRole: "Student",
    // }

    // setComments([...comments, comment]);
    setMessage("");
  };

  return (
    <div className=" rounded-lg p-4 mt-6  bg-linear-to-br from-cyan-400 via-purple-500 to-pink-500 ">
      <h3 className="font-semibold mb-3">Comments</h3>

      <div className="space-y-3 max-h-60 overflow-y-auto">
        {comments.map((c, i) => (
          <div key={i} className="border bg-fuchsia-200 p-2 rounded">
            <p className="text-sm text-black">{c.message}</p>
            <span className="text-xs text-gray-600">
              {c.senderName} • {c.senderRole}
            </span>
          </div>
        ))} 
      </div>

    

      <div className="flex gap-2 mt-3">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={sendComment}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
