import React from "react";

const JobStatsModal = ({ job, onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-lg text-gray-500 hover:text-red-500"
      >
        ✖
      </button>
      <h2 className="text-xl font-bold text-indigo-700 mb-4">
        Job Stats: {job.title}
      </h2>
      <p className="text-gray-700 text-md">
        Total Applicants: <strong>{job.applicants}</strong>
      </p>
    </div>
  </div>
);

export default JobStatsModal;
