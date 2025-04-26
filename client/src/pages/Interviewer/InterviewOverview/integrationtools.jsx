import React, { useState } from "react";

export default function IntegrationTools() {
  const [calendarPlatform, setCalendarPlatform] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [resumeText, setResumeText] = useState("");

  const handleGenerateLink = () => {
    // Placeholder logic
    setMeetingLink("https://meet.fakeplatform.com/auto-generated-link");
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    // Simulate parsing
    setResumeText("Extracted Resume Text from " + file.name);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Integration & Tools</h2>

      {/* Calendar Sync */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Calendar Sync</label>
        <select
          value={calendarPlatform}
          onChange={(e) => setCalendarPlatform(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select platform</option>
          <option value="google">Google Calendar</option>
          <option value="outlook">Outlook Calendar</option>
        </select>
      </div>

      {/* Video Link Generator */}
      <div className="mb-4">
        <button
          onClick={handleGenerateLink}
          className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-700"
        >
          Generate Meeting Link
        </button>
        {meetingLink && (
          <div className="mt-2 text-sm text-black-700">Link: {meetingLink}</div>
        )}
      </div>

      {/* Resume Parser */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">Upload Resume</label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleResumeUpload}
          className="block w-full text-sm text-gray-700"
        />
        {resumeText && <div className="mt-2 text-sm italic">{resumeText}</div>}
      </div>

      {/* Chat/Support Option */}
      <div className="mt-4">
        <a
          href="/support"
          className="text-blue-600 underline text-sm hover:text-blue-800"
        >
          Chat with Support
        </a>
      </div>
    </div>
  );
}
