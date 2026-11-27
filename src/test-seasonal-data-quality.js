
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

// TEST 1: Genuine zero sales in the latest month.
const zeroSalesDemand = createThreeYears();
zeroSalesDemand[35] = 0;

// TEST 2: Missing data in the latest month.
const missingMonthDemand = createThreeYears();
missingMonthDemand[35] = null;

// TEST 3: Previous year's matching month had zero sales.
const zeroBaselineDemand = createThreeYears();
zeroBaselineDemand[23] = 0;

console.log("\n==============================");
console.log("TEST 1: GENUINE ZERO SALES");
console.log("==============================");

const zeroResult =
  detectSeasonalChange(zeroSalesDemand);

console.log("Classification:", zeroResult.classification);
console.log("Valid comparisons:", zeroResult.validComparisons);
console.log("Skipped missing data:", zeroResult.skippedMissingData);
console.log("Skipped zero baseline:", zeroResult.skippedZeroBaseline);
console.log("Latest comparison:", zeroResult.comparisons.slice(-1));

console.log("\n==============================");
console.log("TEST 2: MISSING MONTH");
console.log("==============================");

const missingResult =
  detectSeasonalChange(missingMonthDemand);

console.log("Classification:", missingResult.classification);
console.log("Valid comparisons:", missingResult.validComparisons);
console.log("Skipped missing data:", missingResult.skippedMissingData);
console.log("Skipped zero baseline:", missingResult.skippedZeroBaseline);

console.log("\n==============================");
console.log("TEST 3: ZERO PREVIOUS-YEAR SALES");
console.log("==============================");

const baselineResult =
  detectSeasonalChange(zeroBaselineDemand);

console.log("Classification:", baselineResult.classification);
console.log("Valid comparisons:", baselineResult.validComparisons);
console.log("Skipped missing data:", baselineResult.skippedMissingData);
console.log("Skipped zero baseline:", baselineResult.skippedZeroBaseline);
console.log("Latest comparison:", baselineResult.comparisons.slice(-1));

console.log("\n==============================");
console.log("DATA QUALITY TESTS COMPLETE");
console.log("==============================");
