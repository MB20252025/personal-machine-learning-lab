
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
  { name: "SEASONAL DEMAND", sales: [...seasonal, ...seasonal, ...seasonal] },
  { name: "STABLE DEMAND", sales: stable },
  { name: "INTERMITTENT DEMAND", sales: intermittent },
  { name: "VOLATILE DEMAND", sales: volatile }
];

scenarios.forEach(scenario => {
  console.log("\n==============================");
  console.log(scenario.name);
  console.log("==============================");

  const profile =
    analyseSeasonalProfile(scenario.sales);

  const consistency =
    analyseSeasonalConsistency(scenario.sales);

  const average =
    scenario.sales.reduce((sum, value) => sum + value, 0)
    / scenario.sales.length;

  const zeroMonths =
    scenario.sales.filter(value => value === 0).length;

  console.log("Average demand:", average.toFixed(2));
  console.log("Zero-sales months:", zeroMonths);

  console.log("\nSeasonal indices:");

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

console.log("\nALL FOUR DEMAND BEHAVIOUR TESTS COMPLETE");
