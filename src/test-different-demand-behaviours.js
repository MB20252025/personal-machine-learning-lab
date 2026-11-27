
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const seasonal = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

const stable = Array(36).fill(100);

const intermittent = Array.from(
  { length: 36 },
  (_, index) => index % 4 === 0 ? 100 : 0
);

const volatile = Array.from(
  { length: 36 },
  (_, index) => [20, 180, 40, 250, 60, 220][index % 6]
);

const scenarios = [
  {
    name: "SEASONAL DEMAND",
    sales: [...seasonal, ...seasonal, ...seasonal]
  },
  { name: "STABLE DEMAND", sales: stable },
  { name: "INTERMITTENT DEMAND", sales: intermittent },
  { name: "REPEATING SIX-MONTH PATTERN", sales: volatile }
];

scenarios.forEach(scenario => {
  console.log("\n==============================");
  console.log(scenario.name);
  console.log("==============================");

  const profile =
    analyseSeasonalProfile(scenario.sales);

  const consistency =
    analyseSeasonalConsistency(scenario.sales);

  console.log("Classification:", profile.classification);
  console.log(
    "Annual seasonality supported:",
    profile.annualSeasonalitySupported
  );
  console.log("Annual correlation:", profile.annualCorrelation);
  console.log("Six-month similarity:", profile.halfYearSimilarity);

  console.log("\nMonthly seasonal indices:");

  profile.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Index:", month.seasonalIndex
    );
  });

  console.log("\nConsistency:");

  consistency.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Classification:", month.consistency
    );
  });
});

console.log("\nALL FOUR TESTS COMPLETE");
