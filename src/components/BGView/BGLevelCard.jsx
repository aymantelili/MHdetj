import React from "react";

const BGLevelCard = ({ level, children }) => {
  return (
    <div className="bg-blue-200 border-l-4 border-blue-500 rounded-lg p-2 mb-2 ml-6">
      <h5 className="font-medium">Level {level}</h5>
      {children}
    </div>
  );
};

export default BGLevelCard;
