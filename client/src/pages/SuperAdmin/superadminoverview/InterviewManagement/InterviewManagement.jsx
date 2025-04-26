import React, { useState } from "react";

const mockInterviews = [
  {
    id: 1,
    candidate: "John Doe",
    time: "2025-04-23T10:00:00",
    panel: ["Alice", "Bob"],
    feedback: "Strong frontend skills",
  },
  {
    id: 2,
    candidate: "Jane Smith",
    time: "2025-04-20T15:00:00",
    panel: ["Charlie"],
    feedback: "",
  },
];

const InterviewManagement = () => {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [selectedInterview, setSelectedInterview] = useState(null);

  const isPast = (time) => new Date(time) < new Date();

  const handleAssignPanel = (id, panelist) => {
    setInterviews((prev) =>
      prev.map((intv) =>
        intv.id === id ? { ...intv, panel: [...intv.panel, panelist] } : intv
      )
    );
  };

  const detectConflicts = () => {
    const times = interviews.map((intv) => intv.time);
    const duplicates = times.filter(
      (item, index) => times.indexOf(item) !== index
    );
    return interviews.filter((intv) => duplicates.includes(intv.time));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-indigo-600 py-5 mt-5">
        Interview Management
      </h1>

      <h2 className="text-xl font-semibold mb-2">Upcoming Interviews</h2>
      <table className="w-full table-auto mb-8 bg-white shadow-md rounded">
        <thead className="bg-indigo-100">
          <tr>
            <th>Candidate</th>
            <th>Date & Time</th>
            <th>Panel</th>
            <th>Assign</th>
            <th>Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {interviews
            .filter((i) => !isPast(i.time))
            .map((i) => (
              <tr key={i.id} className="text-center border-t">
                <td>{i.candidate}</td>
                <td>{new Date(i.time).toLocaleString()}</td>
                <td>{i.panel.join(", ")}</td>
                <td>
                  <button
                    onClick={() => handleAssignPanel(i.id, "New Panelist")}
                    className="text-blue-500 underline"
                  >
                    Add Panelist
                  </button>
                </td>
                <td>{i.feedback || "N/A"}</td>
                <td>
                  <button
                    onClick={() => setSelectedInterview(i)}
                    className="text-indigo-500 underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Past Interviews</h2>
      <table className="w-full table-auto bg-white shadow-md rounded">
        <thead className="bg-gray-100">
          <tr>
            <th>Candidate</th>
            <th>Date & Time</th>
            <th>Panel</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {interviews
            .filter((i) => isPast(i.time))
            .map((i) => (
              <tr key={i.id} className="text-center border-t">
                <td>{i.candidate}</td>
                <td>{new Date(i.time).toLocaleString()}</td>
                <td>{i.panel.join(", ")}</td>
                <td>{i.feedback || "No Feedback"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6 text-red-600">
        ⚠️ Schedule Conflicts
      </h2>
      {detectConflicts().length === 0 ? (
        <p>No conflicts detected.</p>
      ) : (
        <ul className="list-disc pl-5">
          {detectConflicts().map((intv) => (
            <li key={intv.id}>
              {intv.candidate} - {new Date(intv.time).toLocaleString()}
            </li>
          ))}
        </ul>
      )}

      {selectedInterview && (
        <div className="mt-6 p-4 border rounded-lg bg-indigo-50">
          <h3 className="text-lg font-semibold text-indigo-700 mb-2">
            Interview Details
          </h3>
          <p><strong>Candidate:</strong> {selectedInterview.candidate}</p>
          <p><strong>Time:</strong> {new Date(selectedInterview.time).toLocaleString()}</p>
          <p><strong>Panel:</strong> {selectedInterview.panel.join(", ")}</p>
          <p><strong>Feedback:</strong> {selectedInterview.feedback || "N/A"}</p>
          <button
            onClick={() => setSelectedInterview(null)}
            className="mt-2 text-red-500 underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default InterviewManagement;
