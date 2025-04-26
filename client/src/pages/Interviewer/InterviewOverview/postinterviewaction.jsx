import React, { useState } from "react";

export default function PostInterviewActions() {
  const [action, setAction] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");

  const handleSubmit = () => {
    // Placeholder for API integration
    console.log("Submitting feedback:", { action, emailTemplate });
  };

  const templates = {
    nextRound: "Dear [Candidate], Congratulations! You have been selected for the next round...",
    rejection: "Dear [Candidate], Thank you for interviewing with us. Unfortunately...",
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Post-Interview Actions</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Select Action</label>
        <select
          value={action}
          onChange={(e) => {
            const selected = e.target.value;
            setAction(selected);
            setEmailTemplate(
              selected === "nextRound"
                ? templates.nextRound
                : selected === "rejection"
                ? templates.rejection
                : ""
            );
          }}
          className="w-full p-2 border rounded"
        >
          <option value="">Choose an option</option>
          <option value="nextRound">Send to Next Round</option>
          <option value="rejection">Reject</option>
        </select>
      </div>

      {emailTemplate && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email Template</label>
          <textarea
            className="w-full p-2 border rounded"
            rows="4"
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Feedback
      </button>
    </div>
  );
}
