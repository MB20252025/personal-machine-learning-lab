
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

// Record genuine zero sales in the latest month.
zeroSalesDemand[35] = 0;

// Create a separate dataset with a missing month.
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

try {
  const zeroResult =
    detectSeasonalChange(zeroSalesDemand);

  console.log("Classification:", zeroResult.classification);
  console.log("Average change:", zeroResult.averageChange);
  console.log("Largest decrease:", zeroResult.largestDecrease);
  console.log("Latest month:", zeroResult.comparisons.slice(-1));
} catch (error) {
  console.log("Error:", error.message);
}

console.log("\n==============================");
console.log("TEST 2: MISSING MONTH");
console.log("==============================");

try {
  const missingResult =
    detectSeasonalChange(missingMonthDemand);

  console.log("Classification:", missingResult.classification);
} catch (error) {
  console.log("Missing data rejected:", error.message);
}
