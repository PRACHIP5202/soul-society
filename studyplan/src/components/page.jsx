// import React from "react";
import { SubjectTopicForm } from "../components/SubjectTopicForm";
import { PomodoroTimer } from "../components/PomodoroTimer";
import { ProgressDashboard } from "../components/ProgressDashboard";
import { AuthForm } from "../components/AuthForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Personalized Study Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Add Subject/Topic</h2>
          <SubjectTopicForm />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Pomodoro Timer</h2>
          <PomodoroTimer />
        </div>
        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Progress Dashboard</h2>
          <ProgressDashboard />
        </div>
        <div className="md:col-span-2 flex justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}

