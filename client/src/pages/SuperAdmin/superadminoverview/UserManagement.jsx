import React, { useState, useEffect } from "react";
import { Pencil, Trash, ShieldCheck } from "lucide-react";

const mockUsers = [
  {
    id: "u1",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "Recruiter",
    active: true,
    lastLogin: "2025-04-21 10:23 AM",
  },
  {
    id: "u2",
    name: "John Doe",
    email: "john@example.com",
    role: "Candidate",
    active: false,
    lastLogin: "2025-04-19 4:15 PM",
  },
  {
    id: "u3",
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    active: true,
    lastLogin: "2025-04-22 9:00 AM",
  },
];

const roles = ["Recruiter", "Candidate", "Admin"];

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(mockUsers);
  }, []);

  const toggleActivation = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const changeRole = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const editUser = (id) => {
    console.log("Edit user:", id);
    // Implement edit logic here
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold  text-purple-700 py-3 mt-5">
         User Management
      </h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-sm text-left border border-gray-200">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Last Login</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-700">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{user.lastLogin}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <ShieldCheck size={16} />
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user.id, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {user.active ? "🟢 Active" : "🔴 Banned"}
                  </span>
                  <button
                    onClick={() => toggleActivation(user.id)}
                    className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded ${
                      user.active
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.active ? "Ban" : "Activate"}
                  </button>
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <button
                    onClick={() => editUser(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
