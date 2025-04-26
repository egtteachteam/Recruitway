import React, { useEffect, useState } from "react";
import { AlertTriangle, Megaphone } from "lucide-react";

const FeedbackModeration = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Replace with API calls
    setFeedbacks([
      { user: "User1", message: "App is crashing frequently", type: "complaint" },
      { user: "User2", message: "Great interface!", type: "feedback" },
    ]);

    setReports([
      { id: 1, reportedBy: "User3", target: "Profile: CandidateX", reason: "Inappropriate photo" },
      { id: 2, reportedBy: "User4", target: "Post: Hiring for XYZ", reason: "Spam content" },
    ]);
  }, []);

  const handleBroadcast = () => {
    console.log("Broadcast message sent");
  };

  return (
    <div className="p-6 space-y-8">
      {/* Reported Profiles/Posts */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 mt-5">
          <AlertTriangle className="w-5 h-5 text-yellow-500" /> Reported Profiles/Posts
        </h2>
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports available.</p>
        ) : (
          <div className="space-y-3">
            {reports.map((report) => (
              <div key={report.id} className="border p-3 rounded bg-gray-50">
                <p><strong>Target:</strong> {report.target}</p>
                <p><strong>Reported By:</strong> {report.reportedBy}</p>
                <p><strong>Reason:</strong> {report.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">User Feedback & Complaints</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback available.</p>
        ) : (
          <div className="space-y-3">
            {feedbacks.map((fb, index) => (
              <div key={index} className="border p-3 rounded bg-gray-50">
                <p><strong>User:</strong> {fb.user}</p>
                <p><strong>Type:</strong> {fb.type}</p>
                <p><strong>Message:</strong> {fb.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Broadcast Button */}
      <div className="flex justify-end">
        <button
          onClick={handleBroadcast}
          className="bg-red-600 hover:bg-red-700 text-black font-medium py-2 px-4 rounded flex items-center gap-2"
        >
          <Megaphone className="w-5 h-5" /> Broadcast Message
        </button>
      </div>
    </div>
  );
};

export default FeedbackModeration;
