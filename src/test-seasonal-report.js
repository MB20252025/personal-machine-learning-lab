
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

const suddenIncreaseAfterGrowth = [
  ...graduallyIncreasingSeasonalDemand
];

suddenIncreaseAfterGrowth[34] = 180;
suddenIncreaseAfterGrowth[35] = 135;

// Gradual growth followed by a sudden demand collapse.
const suddenCollapseAfterGrowth = [
  ...graduallyIncreasingSeasonalDemand
];

suddenCollapseAfterGrowth[34] = 40;
suddenCollapseAfterGrowth[35] = 30;

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

runTest("Normal seasonal demand", normalSeasonalDemand);

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

runTest(
  "Sudden collapse after gradual growth",
  suddenCollapseAfterGrowth
);
