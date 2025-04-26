import React, { useEffect, useState } from "react";

function calculateCountdown(timeString) {
  const [hours, minutes] = timeString.split(":").map(Number);
  const interviewTime = new Date();
  interviewTime.setHours(hours, minutes, 0, 0);
  const diff = interviewTime - new Date();
  if (diff <= 0) return "Started or Passed";
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hrs}h ${remainingMins}m`;
}

export default function InterviewOverview() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    // Placeholder for fetching data from backend later
    const fetchInterviews = async () => {
      const data = [
        { id: 1, name: "Anand Sharma", time: "10:00", role: "Frontend Developer" },
        { id: 2, name: "Priya Verma", time: "11:30", role: "Backend Developer" },
      ];
      setInterviews(data);
    };

    fetchInterviews();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Today's Interviews</h2>
      {interviews.map((int) => (
        <div key={int.id} className="mb-4 border-b pb-2">
          <div className="font-semibold text-lg">{int.name}</div>
          <div className="text-sm text-gray-600">{int.time} - {int.role}</div>
          <div className="text-xs text-blue-600">Starts in: {calculateCountdown(int.time)}</div>
        </div>
      ))}
    </div>
  );
}