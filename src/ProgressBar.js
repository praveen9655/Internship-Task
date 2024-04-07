// src/ProgressBar.js
import React from 'react';

function ProgressBar({ current, total }) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full bg-gray-200 h-4 rounded-lg">
      <div className="bg-blue-500 h-full rounded-lg" style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
