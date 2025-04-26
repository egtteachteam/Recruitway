import React, { useState } from "react";
import JobStatsModal from "./JobStatsModal";
import { Pencil, Trash2, Flag, BarChart3 } from "lucide-react";

const mockJobs = [
  {
    id: "j1",
    title: "Frontend Developer",
    recruiter: "Alice",
    applicants: 24,
    flagged: false,
  },
  {
    id: "j2",
    title: "Backend Engineer",
    recruiter: "Bob",
    applicants: 10,
    flagged: true,
  },
];

const JobPostingManagement = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [statsJob, setStatsJob] = useState(null);

  const toggleFlag = (id) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, flagged: !job.flagged } : job
      )
    );
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const handleEdit = (id) => {
    const newTitle = prompt("Enter new job title:");
    if (newTitle) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === id ? { ...job, title: newTitle } : job
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-indigo-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-indigo-500 py-4 mb-5 mt-5">
           Job Posting Management
        </h1>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-indigo-100 text-indigo-800 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Job Title</th>
                <th className="px-4 py-3 border">Recruiter</th>
                <th className="px-4 py-3 border">Applicants</th>
                <th className="px-4 py-3 border">Flagged</th>
                <th className="px-4 py-3 border text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{job.title}</td>
                  <td className="px-4 py-2 border">{job.recruiter}</td>
                  <td className="px-4 py-2 border">{job.applicants}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => toggleFlag(job.id)}
                      className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded ${
                        job.flagged
                          ? "bg-red-200 text-red-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                      title="Toggle Flag"
                    >
                      <Flag size={16} fill={job.flagged ? "red" : "none"} />
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center space-x-3">
                    <button
                      onClick={() => handleEdit(job.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setStatsJob(job)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                    >
                      <BarChart3 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-4 border text-center text-gray-500"
                  >
                    No jobs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {statsJob && (
          <JobStatsModal job={statsJob} onClose={() => setStatsJob(null)} />
        )}
      </div>
    </div>
  );
};

export default JobPostingManagement;
