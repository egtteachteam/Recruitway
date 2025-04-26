import React, { useEffect, useState } from "react";

export default function InterviewHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Placeholder for fetching previous interview history
    setHistory([
      {
        date: "2023-10-15",
        interviewer: "Ravi Mehta",
        feedback: "Strong technical knowledge, but needs improvement in communication."
      },
      {
        date: "2024-03-05",
        interviewer: "Nisha Kapoor",
        feedback: "Good improvement in communication. Recommended for next round."
      },
    ]);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Interview History</h2>
      {history.length > 0 ? (
        history.map((entry, index) => (
          <div key={index} className="mb-4">
            <div className="font-semibold">Date: {entry.date}</div>
            <div className="text-sm text-gray-700">Interviewer: {entry.interviewer}</div>
            <div className="text-sm italic text-gray-600">"{entry.feedback}"</div>
          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500">No previous interviews recorded.</div>
      )}
    </div>
  );
}
