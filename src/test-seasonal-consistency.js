
const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Test 1: Same seasonal pattern repeated for three years.
const repeatingSales = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Test 2: Stable demand across all three years.
const stableSales = Array(36).fill(100);

// Test 3: One unusual July in the third year.
const unusualSales = [...repeatingSales];
unusualSales[30] = 300;

// Test 4: One missing December observation.
const missingSales = [...repeatingSales];
missingSales[35] = null;

function runTest(name, sales) {
  console.log("\n==============================");
  console.log(name);
  console.log("==============================");

  const result = analyseSeasonalConsistency(sales);

  console.log(
    "Usable observations:",
    result.usableObservations
  );

  console.log("\nMonthly consistency:");

  result.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Average:", month.averageDemand,
      "| Lowest:", month.lowestDemand,
      "| Highest:", month.highestDemand,
      "| Variation:", month.variation,
      "| Consistency:", month.consistency
    );
  });
}

runTest("TEST 1: REPEATING SEASONAL PATTERN", repeatingSales);

runTest("TEST 2: STABLE DEMAND", stableSales);

runTest("TEST 3: UNUSUAL JULY", unusualSales);

runTest("TEST 4: MISSING MONTH", missingSales);

console.log("\nALL SEASONAL CONSISTENCY TESTS COMPLETE");
