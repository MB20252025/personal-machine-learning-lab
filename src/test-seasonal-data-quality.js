
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

// TEST 3: Zero previous-year sales.
const zeroBaselineDemand = createThreeYears();
zeroBaselineDemand[23] = 0;
runTest("TEST 3: ZERO PREVIOUS-YEAR SALES", zeroBaselineDemand);

// TEST 4: Five missing months.
const multipleMissingDemand = createThreeYears();
for (let i = 31; i <= 35; i++) {
  multipleMissingDemand[i] = null;
}
runTest("TEST 4: FIVE MISSING MONTHS", multipleMissingDemand);

// TEST 5: Only one usable comparison.
const oneComparisonDemand = createThreeYears();
for (let i = 31; i <= 35; i++) {
  oneComparisonDemand[i] = null;
}
oneComparisonDemand[35] = 90;
runTest("TEST 5: ONE USABLE COMPARISON", oneComparisonDemand);

// TEST 6: Only two usable comparisons.
const twoComparisonDemand = createThreeYears();
for (let i = 30; i <= 35; i++) {
  twoComparisonDemand[i] = null;
}
twoComparisonDemand[34] = 80;
twoComparisonDemand[35] = 90;
runTest("TEST 6: TWO USABLE COMPARISONS", twoComparisonDemand);

console.log("\n==============================");
console.log("ALL DATA QUALITY TESTS COMPLETE");
console.log("==============================");
