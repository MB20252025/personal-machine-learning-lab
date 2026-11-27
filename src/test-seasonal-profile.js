
const analyseSeasonalProfile =
  require("./seasonal-profile");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Three years with the same seasonal pattern.
const seasonalSales = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Three years with consistent demand.
const stableSales = Array(36).fill(100);

// Three years with a missing month.
const missingSales = [...seasonalSales];
missingSales[35] = null;

function runTest(name, sales) {
  console.log("\n==============================");
  console.log(name);
  console.log("==============================");

  const result = analyseSeasonalProfile(sales);

  console.log("Overall average:", result.overallAverageDemand);
  console.log("Usable observations:", result.usableObservations);
  console.log("Months with data:", result.monthsWithData);

  console.log("\nMonthly seasonal profile:");

  result.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "Average:", month.averageDemand,
      "Seasonal index:", month.seasonalIndex,
      "Observations:", month.observations
    );
  });
}

runTest("TEST 1: REPEATING SEASONAL DEMAND", seasonalSales);

runTest("TEST 2: STABLE DEMAND", stableSales);

runTest("TEST 3: MISSING MONTH", missingSales);

console.log("\nALL SEASONAL PROFILE TESTS COMPLETE");
