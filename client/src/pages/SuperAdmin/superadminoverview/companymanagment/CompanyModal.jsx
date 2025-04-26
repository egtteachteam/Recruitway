import React from "react";
import RecruiterList from "./RecruiterList";

const CompanyModal = ({ company, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md relative border border-purple-100">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 transition text-lg"
          onClick={onClose}
        >
          ✖
        </button>
        <h3 className="text-xl font-bold mb-3 text-purple-700">
          {company.name}
        </h3>
        <RecruiterList recruiters={company.recruiters} />
      </div>
    </div>
  );
};

export default CompanyModal;
