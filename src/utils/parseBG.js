export function parseBGLine(text, cableName) {
  // Example: "Vor1.1 001 003 005" or "Takt5_uss 002 016 004"
  const parts = text.trim().split(/\s+/);
  return {
    cable: cableName,
    location: {
      area: parts[0].toUpperCase().startsWith("VOR") ? "VOR" : "TAKT",
      location: parts[0],
      standar: parseInt(parts[1]),
      level: parseInt(parts[2]),
      shelf: parseInt(parts[3])
    }
  };
}
