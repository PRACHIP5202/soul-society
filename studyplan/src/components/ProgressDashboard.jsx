import React from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Progress</CardTitle>
        <CardDescription>Your study hours for the past week</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

