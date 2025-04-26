import React, { useState } from "react";
import CandidateModal from "./CandidateModal";

const mockCandidates = [
  {
    id: "c1",
    name: "Ravi Kumar",
    email: "ravi@example.com",
    status: "active",
    resumeUrl: "https://example.com/ravi-resume.pdf",
  },
  {
    id: "c2",
    name: "Priya Sharma",
    email: "priya@example.com",
    status: "inactive",
    resumeUrl: "https://example.com/priya-resume.pdf",
  },
];

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selected, setSelected] = useState(null);

  const toggleStatus = (id) => {
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c
      )
    );
  };

  const handleDelete = (id) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (id, updatedData) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updatedData } : c))
    );
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 p-8">
      <h2 className=" font-bold text-purple-700  py-5 mt-5 drop-shadow">
         Candidate Profile Management
      </h2>

      <div className="overflow-x-auto max-w-7xl mx-auto">
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="bg-blue-600 text-black">
              <th className="py-3 px-6 text-left rounded-l-lg">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Resume</th>
              <th className="py-3 px-6 text-center rounded-r-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr
                key={candidate.id}
                className="bg-white shadow-md rounded-xl transition-all hover:scale-[1.01]"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {candidate.name}
                </td>
                <td className="px-6 py-4 text-gray-700">{candidate.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      candidate.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {candidate.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => setSelected(candidate)}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleStatus(candidate.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    {candidate.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    onClick={() => handleDelete(candidate.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <CandidateModal
          candidate={selected}
          onClose={() => setSelected(null)}
          onSave={handleEdit}
        />
      )}
    </div>
  );
};

export default CandidateManagement;
