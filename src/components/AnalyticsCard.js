import React, { useEffect, useState } from "react";

function AnalyticsCard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://feedback-app-2hqw.onrender.com/analytics")
      .then((res) => res.json())
      .then((info) => {
        setData(info);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Analytics fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 text-center">
        <p>Loading analytics...</p>
      </div>
    );

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6 text-center">
      <h2 className="text-xl font-semibold mb-2">📊 Feedback Summary</h2>
      <p className="text-gray-700 text-lg">
        Total Feedbacks: <b>{data.totalFeedbacks}</b>
      </p>
      <p className="text-gray-700 text-lg">
        Average Rating: <b>{data.averageRating}</b> ⭐
      </p>
    </div>
  );
}

export default AnalyticsCard;
