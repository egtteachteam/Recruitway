import React, { useEffect, useState } from "react";

export default function CandidateDetails() {
  const [candidates, setCandidates] = useState([]);
  const [isCandidateApplicationOpen, setIsCandidateApplicationOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const candidateListPerPage = 10;

  useEffect(() => {
    // Simulated backend call for multiple candidates
    const fetchCandidates = async () => {
      const data = [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "+91-9876543210",
          resume: "/resumes/john_doe_resume.pdf",
          linkedin: "https://linkedin.com/in/johndoe",
          position: "Software Engineer",
          description: "Responsible for frontend development using React.js"
        },
        {
          id: 2,
          name: "Priya Singh",
          email: "priya@example.com",
          phone: "+91-9123456780",
          resume: "/resumes/priya_resume.pdf",
          linkedin: "",
          position: "Backend Developer",
          description: "Work on APIs and database layer"
        }
      ];
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const handleViewCandidate = (candidate) => {
    setIsCandidateApplicationOpen(true);
    setSelectedCandidate(candidate);
  };

  const handleModalClose = () => {
    setIsCandidateApplicationOpen(false);
    setSelectedCandidate(null);
  };

  const indexOfLastCandidateList = currentPage * candidateListPerPage;
  const indexOfFirstCandidateList = indexOfLastCandidateList - candidateListPerPage;
  const currentCandidateList = candidates.slice(indexOfFirstCandidateList, indexOfLastCandidateList);
  const totalPages = Math.ceil(candidates.length / candidateListPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!candidates.length) return <div className="p-4">Loading candidate details...</div>;

  return (
    <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 mt-5 py-4">Candidate Details</h2>
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Applied Position</th>
            <th className="p-2 border">Job Description</th>
            <th className="p-2 border">Resume</th>
            <th className="p-2 border">LinkedIn</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCandidateList.map((candidate) => (
            <tr key={candidate.id} className="border-t">
              <td className="p-2 border">{candidate.name}</td>
              <td className="p-2 border">{candidate.email}</td>
              <td className="p-2 border">{candidate.phone}</td>
              <td className="p-2 border">{candidate.position}</td>
              <td className="p-2 border">{candidate.description}</td>
              <td className="p-2 border">
                <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                  Download
                </a>
              </td>
              <td className="p-2 border">
                {candidate.linkedin ? (
                  <a href={candidate.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                    View Profile
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-2 border">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => handleViewCandidate(candidate)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num + 1}
            onClick={() => paginate(num + 1)}
            className={`px-3 py-1 mx-1 rounded ${currentPage === num + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {num + 1}
          </button>
        ))}
      </div>

      {/* Modal Placeholder */}
      {isCandidateApplicationOpen && selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-1/2 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">{selectedCandidate.name}'s Application</h3>
            <p><strong>Email:</strong> {selectedCandidate.email}</p>
            <p><strong>Phone:</strong> {selectedCandidate.phone}</p>
            <p><strong>Position:</strong> {selectedCandidate.position}</p>
            <p><strong>Description:</strong> {selectedCandidate.description}</p>
            <button className="mt-4 px-4 py-2 bg-red-500 text-black rounded" onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
