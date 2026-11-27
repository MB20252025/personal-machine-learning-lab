
const analyseDemandPeriodChanges =
  require("./analyse-demand-period-changes");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

const normalSeasonalDemand = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

const increasedSeasonalDemand = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Increase the final two months compared with previous years.
increasedSeasonalDemand[34] = 120;
increasedSeasonalDemand[35] = 90;

function runTest(name, sales) {
  console.log("\n================================");
  console.log(name);
  console.log("================================");

  const report =
    analyseDemandPeriodChanges(sales);

  console.log(
    "Historical behaviour:",
    report.historicalBehaviour
  );

  console.log(
    "Current behaviour:",
    report.currentBehaviour
  );

  console.log(
    "Ordinary demand change:",
    report.demandChange
  );

  console.log(
    "Seasonal comparison:",
    report.seasonalComparison
  );
}

runTest(
  "Normal seasonal demand",
  normalSeasonalDemand
);

runTest(
  "Seasonal demand with recent increase",
  increasedSeasonalDemand
);
