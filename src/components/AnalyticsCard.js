import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#7F5AF0", "#2CBDFE", "#F5A623", "#00DFA2", "#FF6F61"];

function AnalyticsCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://feedback-app-2hqw.onrender.com/analytics")
      .then((res) => res.json())
      .then((info) => setData(info))
      .catch((err) => console.error("Analytics fetch error:", err));
  }, []);

  if (!data) {
    return (
      <div className="bg-[#1A1A1A] rounded-2xl p-6 mt-6 text-center shadow-lg">
        <p>Loading analytics...</p>
      </div>
    );
  }

  const ratingData = [
    { name: "1⭐", value: data.ratingCounts?.[1] || 0 },
    { name: "2⭐", value: data.ratingCounts?.[2] || 0 },
    { name: "3⭐", value: data.ratingCounts?.[3] || 0 },
    { name: "4⭐", value: data.ratingCounts?.[4] || 0 },
    { name: "5⭐", value: data.ratingCounts?.[5] || 0 },
  ];

  return (
    <div className="bg-[#1A1A1A] text-white rounded-2xl p-6 mt-6 shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">📊 Feedback Summary</h2>
      <p>Total Feedbacks: <b>{data.totalFeedbacks}</b></p>
      <p>Average Rating: <b>{data.averageRating}</b> ⭐</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={ratingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {ratingData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingData}>
              <XAxis dataKey="name" stroke="#EAEAEA" />
              <YAxis stroke="#EAEAEA" />
              <Tooltip />
              <Bar dataKey="value" fill="#2CBDFE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsCard;
