import React from "react";

const BGStandarCard = ({ standar, children }) => {
  return (
    <div className="bg-blue-100 border-l-4 border-blue-400 rounded-lg p-3 mb-2 ml-4">
      <h4 className="font-semibold">Standar {standar}</h4>
      {children}
    </div>
  );
};

export default BGStandarCard;
