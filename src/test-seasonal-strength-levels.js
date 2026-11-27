const detectSeasonalPatternChange = require("./seasonal-pattern-change");

const basePattern = [
  50, 60, 70, 80, 100, 140,
  180, 160, 130, 100, 80, 60
];

function createYear(strength, noise) {
  const average = basePattern.reduce(
    (sum, value) => sum + value, 0
  ) / basePattern.length;

  return basePattern.map((value, index) => {
    const seasonalEffect = (value - average) * strength;
    return Math.max(0, average + seasonalEffect + noise[index]);
  });
}

const noiseA = [3, -2, 4, -3, 2, -4, 3, -2, 4, -3, 2, -4];
const noiseB = [-3, 2, -4, 3, -2, 4, -3, 2, -4, 3, -2, 4];

function runTest(name, finalStrength) {
  const sales = [
    ...createYear(1, noiseA),
    ...createYear(1, noiseB),
    ...createYear(finalStrength, noiseA)
  ];

  const result = detectSeasonalPatternChange(sales);

  console.log("\n" + name);
  console.log("Classification:", result.classification);
  console.log("Strength change:", result.strengthChange);

  result.yearlyProfiles.forEach(profile => {
    console.log(
      "Year:", profile.year,
      "| Seasonal range:", profile.seasonalRange
    );
  });
}

runTest("MILD INCREASE", 1.1);
runTest("MODERATE INCREASE", 1.25);
runTest("STRONG INCREASE", 1.5);
runTest("VERY STRONG INCREASE", 2);

console.log("\nALL SEASONAL STRENGTH LEVEL TESTS COMPLETE");
