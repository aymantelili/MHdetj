import React from "react";

const BGShelfCard = ({ shelf, children }) => {
  return (
    <div className="bg-blue-300 border-l-4 border-blue-600 rounded-lg p-2 mb-2 ml-8">
      <h6 className="font-medium">Shelf {shelf}</h6>
      {children}
    </div>
  );
};

export default BGShelfCard;
