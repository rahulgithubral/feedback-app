import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "1 Star", value: 1 },
  { name: "2 Star", value: 2 },
  { name: "3 Star", value: 3 },
  { name: "4 Star", value: 4 },
  { name: "5 Star", value: 5 },
];

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#845EC2"];

const RatingPieChart = () => {
  return (
    <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-center">Rating Distribution</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingPieChart;
