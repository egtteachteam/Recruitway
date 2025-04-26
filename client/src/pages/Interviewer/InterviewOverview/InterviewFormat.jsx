import React, { useEffect, useState } from "react";

export default function InterviewFormat() {
  const [format, setFormat] = useState(null);

  useEffect(() => {
    // Simulated backend fetch
    const fetchInterviewFormat = async () => {
      const data = {
        type: "Technical",
        mode: "Google Meet",
        topics: ["JavaScript Basics", "React Hooks", "API Integration"],
        evaluation: ["Technical Skills", "Communication", "Problem Solving"]
      };
      setFormat(data);
    };

    fetchInterviewFormat();
  }, []);

  if (!format) return <div className="p-4">Loading interview format...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Interview Format</h2>
      <p><strong>Interview Type:</strong> {format.type}</p>
      <p><strong>Interview Mode:</strong> {format.mode}</p>
      <p><strong>Topics to Cover:</strong></p>
      <ul className="list-disc list-inside">
        {format.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      <p className="mt-2"><strong>Evaluation Criteria:</strong></p>
      <ul className="list-disc list-inside">
        {format.evaluation.map((criteria, index) => (
          <li key={index}>{criteria}</li>
        ))}
      </ul>
    </div>
  );
}