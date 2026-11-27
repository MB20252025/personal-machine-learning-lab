const detectSeasonalPatternChange = require("./seasonal-pattern-change");

const julyPeak = [
  50, 60, 70, 80, 100, 140,
  180, 160, 130, 100, 80, 60
];

const augustPeak = [
  50, 60, 70, 80, 100, 130,
  160, 180, 150, 110, 80, 60
];

const decemberPeak = [
  50, 60, 70, 80, 90, 100,
  110, 120, 140, 160, 180, 200
];

const noise = [
  2, -2, 3, -3, 2, -2,
  3, -3, 2, -2, 3, -3
];

function addNoise(pattern) {
  return pattern.map(
    (value, index) => value + noise[index]
  );
}

function runTest(name, sales) {
  const result = detectSeasonalPatternChange(sales);

  console.log("\n" + name);
  console.log("Classification:", result.classification);
  console.log("Peak shifted:", result.peakShift);
  console.log("Strength change:", result.strengthChange);

  result.yearlyProfiles.forEach(profile => {
    console.log(
      "Year:", profile.year,
      "| Peak months:", profile.peakMonths.join(", ") || "Unknown",
      "| Seasonal range:", profile.seasonalRange
    );
  });
}

runTest("STABLE JULY PEAK", [
  ...addNoise(julyPeak),
  ...addNoise(julyPeak),
  ...addNoise(julyPeak)
]);

runTest("GRADUAL PEAK MOVEMENT", [
  ...addNoise(julyPeak),
  ...addNoise(augustPeak),
  ...addNoise(decemberPeak)
]);

runTest("SUDDEN PEAK MOVEMENT", [
  ...addNoise(julyPeak),
  ...addNoise(julyPeak),
  ...addNoise(decemberPeak)
]);

console.log("\nALL SEASONAL PEAK MOVEMENT TESTS COMPLETE");
