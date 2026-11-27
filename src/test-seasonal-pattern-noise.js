const detectSeasonalPatternChange = require("./seasonal-pattern-change");

function createSeasonalYear(noiseValues = []) {
  const pattern = [
    50, 60, 70, 80, 100, 140,
    180, 160, 130, 100, 80, 60
  ];

  return pattern.map((value, index) =>
    Math.max(0, value + (noiseValues[index] || 0))
  );
}

const noiseA = [
  3, -2, 4, -3, 2, -4,
  3, -2, 4, -3, 2, -4
];

const noiseB = [
  -3, 2, -4, 3, -2, 4,
  -3, 2, -4, 3, -2, 4
];

function runTest(name, sales) {
  const result = detectSeasonalPatternChange(sales);

  console.log("\n" + name);
  console.log("Classification:", result.classification);
  console.log("Confidence:", result.confidence);
  console.log("Strength change:", result.strengthChange);
  console.log("Peak shifted:", result.peakShift);
}

const stableSeasonality = [
  ...createSeasonalYear(noiseA),
  ...createSeasonalYear(noiseB),
  ...createSeasonalYear(noiseA)
];

const increasingSeasonality = [
  ...createSeasonalYear(noiseA),
  ...createSeasonalYear(noiseB),
  ...createSeasonalYear(
    noiseA.map(value => value * 3)
  )
];

const disappearingSeasonality = [
  ...createSeasonalYear(noiseA),
  ...createSeasonalYear(noiseB),
  ...Array(12).fill(100)
];

runTest("NOISY STABLE SEASONALITY", stableSeasonality);

runTest("NOISY INCREASING SEASONALITY", increasingSeasonality);

runTest("NOISY DISAPPEARING SEASONALITY", disappearingSeasonality);

console.log("\nALL REPEATABLE NOISY TESTS COMPLETE");
