const detectSeasonalPatternChange = require("./seasonal-pattern-change");

const seasonalYear = [
  50, 60, 70, 80, 100, 140,
  180, 160, 130, 100, 80, 60
];

function runTest(name, sales) {
  console.log("\n" + name);

  try {
    const result = detectSeasonalPatternChange(sales);

    console.log("Classification:", result.classification);
    console.log("Confidence:", result.confidence);
    console.log("Years analysed:", result.yearsAnalysed);
    console.log("Usable years:", result.usableYears);

  } catch (error) {
    console.log("Error:", error.message);
  }
}

// Only two usable years
const twoUsableYears = [
  ...seasonalYear,
  ...Array(12).fill(null),
  ...seasonalYear
];

// Four years, but only two usable years
const twoOfFourUsable = [
  ...seasonalYear,
  ...Array(12).fill(null),
  ...seasonalYear,
  ...Array(12).fill(null)
];

// Every year has fewer than nine usable months
const tooManyMissingMonths = [
  ...seasonalYear.map((value, index) =>
    index < 5 ? value : null
  ),
  ...seasonalYear.map((value, index) =>
    index < 5 ? value : null
  ),
  ...seasonalYear.map((value, index) =>
    index < 5 ? value : null
  )
];

// Less than the required 36 months
const shortHistory = seasonalYear.slice(0, 24);

runTest("TWO USABLE YEARS", twoUsableYears);

runTest("TWO USABLE YEARS OUT OF FOUR", twoOfFourUsable);

runTest("TOO MANY MISSING MONTHS", tooManyMissingMonths);

runTest("ONLY 24 MONTHS OF HISTORY", shortHistory);

console.log("\nALL INSUFFICIENT HISTORY TESTS COMPLETE");
