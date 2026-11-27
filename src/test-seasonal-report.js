
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

increasedSeasonalDemand[34] = 120;
increasedSeasonalDemand[35] = 90;

const graduallyIncreasingSeasonalDemand = [
  ...yearlyDemand,
  ...yearlyDemand.map(value => value * 1.1),
  ...yearlyDemand.map(value => value * 1.2)
];

// Start with gradual growth, then introduce a sudden increase.
const suddenIncreaseAfterGrowth = [
  ...graduallyIncreasingSeasonalDemand
];

suddenIncreaseAfterGrowth[34] = 180;
suddenIncreaseAfterGrowth[35] = 135;

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

runTest(
  "Gradually increasing seasonal demand",
  graduallyIncreasingSeasonalDemand
);

runTest(
  "Sudden increase after gradual growth",
  suddenIncreaseAfterGrowth
);
