
const detectSeasonalChange =
  require("./detect-seasonal-change");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

function createThreeYears() {
  return [
    ...yearlyDemand,
    ...yearlyDemand,
    ...yearlyDemand
  ];
}

function runTest(name, sales) {
  console.log("\n==============================");
  console.log(name);
  console.log("==============================");

  const result = detectSeasonalChange(sales);

  console.log("Classification:", result.classification);
  console.log("Valid comparisons:", result.validComparisons);
  console.log("Skipped missing data:", result.skippedMissingData);
  console.log("Skipped zero baseline:", result.skippedZeroBaseline);
  console.log("Average change:", result.averageChange);
}

// TEST 1: Genuine zero sales.
const zeroSalesDemand = createThreeYears();
zeroSalesDemand[35] = 0;

runTest("TEST 1: GENUINE ZERO SALES", zeroSalesDemand);

// TEST 2: One missing month.
const missingMonthDemand = createThreeYears();
missingMonthDemand[35] = null;

runTest("TEST 2: ONE MISSING MONTH", missingMonthDemand);

// TEST 3: Zero sales in the previous year.
const zeroBaselineDemand = createThreeYears();
zeroBaselineDemand[23] = 0;

runTest("TEST 3: ZERO PREVIOUS-YEAR SALES", zeroBaselineDemand);

// TEST 4: Several missing months.
const multipleMissingDemand = createThreeYears();

multipleMissingDemand[31] = null;
multipleMissingDemand[32] = null;
multipleMissingDemand[33] = null;
multipleMissingDemand[34] = null;
multipleMissingDemand[35] = null;

runTest("TEST 4: FIVE MISSING MONTHS", multipleMissingDemand);

console.log("\n==============================");
console.log("ALL DATA QUALITY TESTS COMPLETE");
console.log("==============================");
