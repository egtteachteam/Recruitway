import React, { useEffect, useState } from "react";

const predefinedTags = [
  "Good communication",
  "Needs improvement",
  "Confident",
  "Technical expertise"
];

export default function RealTimeNotes() {
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState([]);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("interview_notes");
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("interview_notes", notes);
    }, 1000);
    return () => clearTimeout(timer);
  }, [notes]);

  const toggleTag = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Real-Time Notes</h2>
      <textarea
        className="w-full p-2 border rounded resize-none h-32"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your notes here..."
      />
      <div className="mt-3">
        <p className="font-semibold mb-1">Predefined Tags:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full border text-sm ${
                tags.includes(tag) ? "bg-blue-600 text-white" : "bg-gray-100"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold mb-1">Candidate Quotes / Feedback:</p>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Enter memorable quotes or interviewer feedback..."
        />
      </div>
    </div>
  );
}