export function sortBGData(data) {
  return data.sort((a, b) => {
    // Area: VOR first
    if (a.location.area === "VOR" && b.location.area !== "VOR") return -1;
    if (a.location.area !== "VOR" && b.location.area === "VOR") return 1;

    // Location major/minor
    const regex = /(\d+)(?:\.(\d+))?/;
    const aMatch = a.location.location.match(regex);
    const bMatch = b.location.location.match(regex);

    const aMajor = parseInt(aMatch[1]);
    const aMinor = parseInt(aMatch[2] || 0);
    const bMajor = parseInt(bMatch[1]);
    const bMinor = parseInt(bMatch[2] || 0);

    if (aMajor !== bMajor) return aMajor - bMajor;
    if (aMinor !== bMinor) return aMinor - bMinor;

    // Standar
    if (a.location.standar !== b.location.standar)
      return a.location.standar - b.location.standar;

    // Level
    if (a.location.level !== b.location.level)
      return a.location.level - b.location.level;

    // Shelf
    return a.location.shelf - b.location.shelf;
  });
}
