import React, { useState } from "react";
import CompanyModal from "./CompanyModal";
import { Pencil, Trash2, Users } from "lucide-react";

const mockCompanies = [
  {
    id: "1",
    name: "Acme Corp",
    status: "pending",
    recruiters: ["Alice", "Bob"],
  },
  {
    id: "2",
    name: "TechNova",
    status: "approved",
    recruiters: ["Charlie"],
  },
];

const CompanyManagement = () => {
  const [companies, setCompanies] = useState(mockCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  const handleDelete = (id) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (id) => {
    const newName = prompt("Enter new company name:");
    if (newName) {
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === id ? { ...company, name: newName } : company
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-700  py-5 mt-5 drop-shadow">
           Company Management Dashboard
        </h1>

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm border border-gray-200">
            <thead className="bg-purple-100 text-purple-800 font-semibold uppercase">
              <tr>
                <th className="px-4 py-3 border">#</th>
                <th className="px-4 py-3 border">Company Name</th>
                <th className="px-4 py-3 border">Status</th>
                <th className="px-4 py-3 border">Recruiters</th>
                <th className="px-4 py-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border">{company.name}</td>
                  <td className="px-4 py-2 border">
                    <select
                      className="bg-purple-50 border border-purple-300 rounded px-2 py-1 text-sm"
                      value={company.status}
                      onChange={(e) =>
                        handleStatusChange(company.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {company.recruiters.length}
                  </td>
                  <td className="px-4 py-2 border text-center space-x-3">
                    <button
                      onClick={() => handleEdit(company.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedCompany(company)}
                      className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                      title="View Recruiters"
                    >
                      <Users size={16} />
                    </button>
                  </td>
                </tr>
              ))}
              {companies.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 py-4 border"
                  >
                    No companies available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedCompany && (
          <CompanyModal
            company={selectedCompany}
            onClose={() => setSelectedCompany(null)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyManagement;
