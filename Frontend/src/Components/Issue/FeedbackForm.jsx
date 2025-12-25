import React, { useState } from "react";

export default function FeedbackForm({ issueId, onSuccess }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          issueId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Feedback submission failed");
      }

      // reset UI
      setRating(0);
      setComment("");
      setShow(false);

      // notify parent (optional)
      onSuccess?.();

    } catch (error) {
      console.error(error);
      alert("Unable to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <button
        onClick={() => setShow(true)}
        className="text-xl font-semibold text-indigo-600 p-2"
      >
        Give Your Feedback
      </button>

      {show && (
        <form onSubmit={handleSubmit}>
          {/* STAR RATING */}
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className={`text-3xl transition ${
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </button>
            ))}
          </div>

          {/* COMMENT */}
          <textarea
            placeholder="Write your comments (optional)"
            className="w-full border rounded p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      )}
    </div>
  );
}
