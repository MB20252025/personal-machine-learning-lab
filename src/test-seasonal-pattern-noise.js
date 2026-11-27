const detectSeasonalPatternChange = require("./seasonal-pattern-change");

function createSeasonalYear(noise = 0) {
  const pattern = [
    50, 60, 70, 80, 100, 140,
    180, 160, 130, 100, 80, 60
  ];

  return pattern.map(value =>
    Math.max(0, value + (Math.random() * noise * 2 - noise))
  );
}

function runTest(name, sales) {
  const result = detectSeasonalPatternChange(sales);

  console.log("\n" + name);
  console.log("Classification:", result.classification);
  console.log("Confidence:", result.confidence);
  console.log("Strength change:", result.strengthChange);
  console.log("Peak shifted:", result.peakShift);
}

const stableSeasonality = [
  ...createSeasonalYear(5),
  ...createSeasonalYear(5),
  ...createSeasonalYear(5)
];

const increasingSeasonality = [
  ...createSeasonalYear(5),
  ...createSeasonalYear(5),
  ...createSeasonalYear(20)
];

const disappearingSeasonality = [
  ...createSeasonalYear(5),
  ...createSeasonalYear(5),
  ...Array(12).fill(100)
];

runTest("NOISY STABLE SEASONALITY", stableSeasonality);

runTest("NOISY INCREASING SEASONALITY", increasingSeasonality);

runTest("NOISY DISAPPEARING SEASONALITY", disappearingSeasonality);

console.log("\nALL NOISY SEASONAL TESTS COMPLETE");
