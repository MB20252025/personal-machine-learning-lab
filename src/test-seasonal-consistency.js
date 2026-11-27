
const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Same seasonal pattern repeated three times.
const repeatingSales = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Same seasonal pattern, but overall sales grow each year.
const growingSales = [
  ...yearlyDemand,
  ...yearlyDemand.map(value => value * 1.2),
  ...yearlyDemand.map(value => value * 1.5)
];

// Stable demand.
const stableSales = Array(36).fill(100);

// One unusual July in the third year.
const unusualSales = [...repeatingSales];
unusualSales[30] = 300;

// One missing December observation.
const missingSales = [...repeatingSales];
missingSales[35] = null;

function runTest(name, sales) {
  console.log("\n==============================");
  console.log(name);
  console.log("==============================");

  const result = analyseSeasonalConsistency(sales);

  console.log("\nYearly averages:");

  result.yearlyProfiles.forEach(year => {
    console.log(
      "Year:", year.year,
      "| Average:", year.averageDemand,
      "| Usable months:", year.usableMonths
    );
  });

  console.log("\nMonthly seasonal consistency:");

  result.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Seasonal index:", month.averageSeasonalIndex,
      "| Variation:", month.variation,
      "| Consistency:", month.consistency
    );
  });
}

runTest("TEST 1: REPEATING SEASONAL PATTERN", repeatingSales);

runTest("TEST 2: GROWING SALES, SAME SEASONAL PATTERN", growingSales);

runTest("TEST 3: STABLE DEMAND", stableSales);

runTest("TEST 4: UNUSUAL JULY", unusualSales);

runTest("TEST 5: MISSING MONTH", missingSales);

console.log("\nALL SEASONAL CONSISTENCY TESTS COMPLETE");
