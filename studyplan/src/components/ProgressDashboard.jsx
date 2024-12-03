// import React from "react";

const data = [
  { name: "Mon", total: 4 },
  { name: "Tue", total: 3 },
  { name: "Wed", total: 2 },
  { name: "Thu", total: 5 },
  { name: "Fri", total: 3 },
  { name: "Sat", total: 4 },
  { name: "Sun", total: 3 },
];

export function ProgressDashboard() {
  const maxTotal = Math.max(...data.map(item => item.total));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Weekly Study Progress</h2>
      <p className="text-gray-600 mb-4">Your study hours for the past week</p>
      <div className="flex items-end space-x-2 h-48">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-blue-500 rounded-t"
              style={{ height: `${(item.total / maxTotal) * 100}%` }}
            ></div>
            <span className="text-sm mt-2">{item.name}</span>
            <span className="text-sm font-semibold">{item.total}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

