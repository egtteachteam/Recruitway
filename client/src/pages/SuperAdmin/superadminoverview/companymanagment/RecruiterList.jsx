import React from "react";

const RecruiterList = ({ recruiters }) => (
  <ul className="space-y-2">
    {recruiters.map((name, idx) => (
      <li
        key={idx}
        className="bg-purple-50 border border-purple-200 rounded-xl px-4 py-2 text-sm text-purple-800 flex items-center gap-2"
      >
        👤 {name}
      </li>
    ))}
  </ul>
);

export default RecruiterList;
