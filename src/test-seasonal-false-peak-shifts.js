const detectSeasonalPatternChange = require("./seasonal-pattern-change");

const basePattern = [
  50, 60, 70, 80, 100, 140,
  180, 160, 130, 100, 80, 60
];

const noiseA = [
  3, -2, 4, -3, 2, -4,
  3, -2, 4, -3, 2, -4
];

const noiseB = [
  -3, 2, -4, 3, -2, 4,
  -3, 2, -4, 3, -2, 4
];

const noiseC = [
  5, -4, 3, -2, 4, -3,
  -5, 4, -3, 2, -4, 3
];

function createYear(noise) {
  return basePattern.map(
    (value, index) => value + noise[index]
  );
}

function runTest(name, sales) {
  const result = detectSeasonalPatternChange(sales);

  console.log("\n" + name);
  console.log("Classification:", result.classification);
  console.log("Peak shifted:", result.peakShift);

  result.yearlyProfiles.forEach(profile => {
    console.log(
      "Year:", profile.year,
      "| Peak months:", profile.peakMonths.join(", ") || "Unknown",
      "| Seasonal range:", profile.seasonalRange
    );
  });
}

runTest("SMALL RANDOM-LIKE FLUCTUATIONS", [
  ...createYear(noiseA),
  ...createYear(noiseB),
  ...createYear(noiseC)
]);

runTest("SAME PEAK WITH DIFFERENT NOISE", [
  ...createYear(noiseC),
  ...createYear(noiseA),
  ...createYear(noiseB)
]);

console.log("\nALL FALSE PEAK SHIFT TESTS COMPLETE");
