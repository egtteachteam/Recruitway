import React, { useEffect, useState } from "react";

const skillsList = ["Technical Skills", "Communication", "Problem Solving"];
const recommendations = ["Strong Yes", "Yes", "No", "Strong No"];

export default function ScoringSystem() {
  const [scores, setScores] = useState({});
  const [recommendation, setRecommendation] = useState("");
  const [average, setAverage] = useState(null);

  useEffect(() => {
    const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
    const avg = Object.keys(scores).length ? total / Object.keys(scores).length : null;
    setAverage(avg ? avg.toFixed(1) : null);
  }, [scores]);

  const handleScoreChange = (skill, value) => {
    setScores((prev) => ({ ...prev, [skill]: parseInt(value) }));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-bold mb-2 mt-5 py-4">Scoring System</h2>
      {skillsList.map((skill) => (
        <div key={skill} className="mb-4">
          <label className="block font-semibold mb-1">{skill}</label>
          <input
            type="range"
            min="1"
            max="5"
            value={scores[skill] || 3}
            onChange={(e) => handleScoreChange(skill, e.target.value)}
            className="w-full"
          />
          <div className="text-sm text-gray-700">Score: {scores[skill] || 3}</div>
        </div>
      ))}

      <div className="mt-4">
        <label className="block font-semibold mb-1">Overall Recommendation</label>
        <select
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select recommendation</option>
          {recommendations.map((rec, idx) => (
            <option key={idx} value={rec}>{rec}</option>
          ))}
        </select>
      </div>

      {average && (
        <div className="mt-4 text-green-700 font-bold">
          Average Score: {average}
        </div>
      )}
    </div>
  );
}
