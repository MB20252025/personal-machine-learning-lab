
const detectSeasonalChange =
  require("./detect-seasonal-change");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Three years of normal seasonal demand.
const zeroSalesDemand = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// A genuine zero sale in the latest month.
zeroSalesDemand[35] = 0;

// A separate dataset with a missing latest month.
const missingMonthDemand = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Missing data is represented by null.
missingMonthDemand[35] = null;

console.log("\n==============================");
console.log("TEST 1: GENUINE ZERO SALES");
console.log("==============================");

const zeroResult =
  detectSeasonalChange(zeroSalesDemand);

console.log("Classification:", zeroResult.classification);
console.log("Average change:", zeroResult.averageChange);
console.log("Largest decrease:", zeroResult.largestDecrease);
console.log("Valid comparisons:", zeroResult.validComparisons);
console.log("Skipped comparisons:", zeroResult.skippedComparisons);
console.log("Latest comparison:", zeroResult.comparisons.slice(-1));

console.log("\n==============================");
console.log("TEST 2: MISSING MONTH");
console.log("==============================");

const missingResult =
  detectSeasonalChange(missingMonthDemand);

console.log("Classification:", missingResult.classification);
console.log("Valid comparisons:", missingResult.validComparisons);
console.log("Skipped comparisons:", missingResult.skippedComparisons);
console.log("Latest comparisons:", missingResult.comparisons.slice(-2));

console.log("\n==============================");
console.log("DATA QUALITY TESTS COMPLETE");
console.log("==============================");
