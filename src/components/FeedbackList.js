import React, { useEffect, useState } from "react";

function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   fetch("https://feedback-app-2hqw.onrender.com/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch feedbacks:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading feedbacks...</p>;

  if (feedbacks.length === 0) return <p>No feedbacks yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Recent Feedbacks</h3>
      <ul className="space-y-4 max-h-64 overflow-y-auto">
        {feedbacks.map(({ _id, name, rating, comment }) => (
          <li
            key={_id}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <p><strong>{name}</strong> rated: <span className="font-bold">{rating} ⭐</span></p>
            <p className="text-gray-700 italic">"{comment || "No comment"}"</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedbackList;
