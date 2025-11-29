import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import * as XLSX from "xlsx";
import { bgFilesMap } from "../data/bgFilesList";

// Component ???? ????? Excel ??? ???????
const BGFileContent = ({ filePath }) => {
  const [cables, setCables] = useState([]);

  React.useEffect(() => {
    if (!filePath) return;

    const fetchAndParse = async () => {
      try {
        const res = await fetch(filePath);
        const arrayBuffer = await res.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        const parsed = data
          .filter(row => row[0] && row[0].toString().startsWith("AJ7"))
          .map(row => {
            const name = row[0];
            const place = row[1];
            const parts = place.split(" ");
            const location = parts[0];
            const standard = parts[1];
            const level = parts[2];
            const shelf = parts[3];
            return { name, location, standard, level, shelf };
          });

        parsed.sort((a, b) => {
          const orderA = a.location.toUpperCase().startsWith("VOR") ? 0 : 1;
          const orderB = b.location.toUpperCase().startsWith("VOR") ? 0 : 1;
          if (orderA !== orderB) return orderA - orderB;
          return parseInt(a.standard) - parseInt(b.standard);
        });

        setCables(parsed);
      } catch (err) {
        console.error("Error reading Excel file:", err);
      }
    };

    fetchAndParse();
  }, [filePath]);

  if (!filePath) return null;

  return (
    <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
      <h4 className="font-semibold mb-2">Cables in File: {filePath.split("/").pop()}</h4>
      <ul className="space-y-1 text-sm text-gray-700">
        {cables.map((c, idx) => (
          <li key={idx}>
            {c.name} - {c.location} / Std:{c.standard} / Level:{c.level} / Shelf:{c.shelf}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Component ??????? ????? ?? ????? ???????
const BGFileSelector = ({ bgType, line, files, onSelect, onBack }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between mb-4">
      <h5 className="font-semibold text-gray-700">
        W�hlen Sie BG-Datei / Select BG File
      </h5>
      <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
        <ArrowLeft className="w-4 h-4 mr-1" /> Zur�ck / Back
      </button>
    </div>

    {files && files.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {files.map(file => (
          <button
            key={file}
            onClick={() => onSelect(file)}
            className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400"
          >
            {file}
          </button>
        ))}
      </div>
    ) : (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-gray-700">
        ?? Keine BG-Dateien in diesem Produktionsline / No BG files in this production line
      </div>
    )}
  </div>
);

// ?????? ???????? VIEW Component
const ViewBGPage = () => {
  const [step, setStep] = useState("bgType"); // bgType -> line -> file -> content
  const [selectedBGType, setSelectedBGType] = useState(null);
  const [selectedLine, setSelectedLine] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleBGTypeSelect = (type) => {
    setSelectedBGType(type);
    setStep("line");
  };

  const handleLineSelect = (line) => {
    setSelectedLine(line);
    setStep("file");
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setStep("content");
  };

  const handleBack = () => {
    if (step === "content") setStep("file");
    else if (step === "file") setStep("line");
    else if (step === "line") setStep("bgType");
  };

  const bgTypes = Object.keys(bgFilesMap);
  const lines = selectedBGType ? Object.keys(bgFilesMap[selectedBGType]) : [];
  const files = selectedBGType && selectedLine ? bgFilesMap[selectedBGType][selectedLine] : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6">View BG / BG Anzeigen</h2>

      {step === "bgType" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {bgTypes.map(type => (
            <button
              key={type}
              onClick={() => handleBGTypeSelect(type)}
              className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-400"
            >
              {type}
            </button>
          ))}
        </div>
      )}

      {step === "line" && (
        <div>
          <button onClick={handleBack} className="mb-4 text-sm text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Zur�ck / Back
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {lines.map(line => (
              <button
                key={line}
                onClick={() => handleLineSelect(line)}
                className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-500"
              >
                {line}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "file" && (
        <BGFileSelector
          bgType={selectedBGType}
          line={selectedLine}
          files={files}
          onSelect={handleFileSelect}
          onBack={handleBack}
        />
      )}

      {step === "content" && (
        <div>
          <button onClick={handleBack} className="mb-4 text-sm text-gray-600 hover:text-gray-800 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Zur�ck / Back
          </button>
          <BGFileContent
            filePath={`/bg-files/${selectedBGType}/${selectedLine}/${selectedFile}`}
          />
        </div>
      )}
    </div>
  );
};

export default ViewBGPage;
