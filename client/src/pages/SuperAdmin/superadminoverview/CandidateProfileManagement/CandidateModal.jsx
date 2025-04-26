import React, { useState } from "react";

const CandidateModal = ({ candidate, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: candidate.name,
    email: candidate.email,
    resumeUrl: candidate.resumeUrl,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    onSave(candidate.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-xl font-semibold text-blue-800 mb-4">
          Edit Candidate Profile
        </h2>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <input
          name="resumeUrl"
          value={formData.resumeUrl}
          onChange={handleChange}
          placeholder="Resume URL"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default CandidateModal;
