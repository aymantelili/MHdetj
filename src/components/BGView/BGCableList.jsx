import React from "react";

const BGCableList = ({ cables }) => {
  return (
    <ul className="list-disc ml-10 text-gray-700 text-sm">
      {cables.map((cable) => (
        <li key={cable}>{cable}</li>
      ))}
    </ul>
  );
};

export default BGCableList;
