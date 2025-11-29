import React from "react";

const BGAreaCard = ({ area, children }) => {
  return (
    <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-4 shadow">
      <h3 className="font-bold text-lg mb-2">{area}</h3>
      {children}
    </div>
  );
};

export default BGAreaCard;
