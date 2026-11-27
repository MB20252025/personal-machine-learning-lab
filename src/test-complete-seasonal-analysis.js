
const completeSeasonalAnalysis = require("./complete-seasonal-analysis");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Same seasonal pattern, with sales growing each year.
const sales = [
  ...yearlyDemand,
  ...yearlyDemand.map(value => value * 1.1),
  ...yearlyDemand.map(value => value * 1.2)
];

// Introduce an unusual recent increase.
sales[34] = 180;
sales[35] = 135;

console.log("================================");
console.log("COMPLETE SEASONAL ANALYSIS");
console.log("================================");

const result = completeSeasonalAnalysis(sales);

console.log("\n1. NORMALISED SEASONAL PROFILE");

result.seasonalProfile.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Seasonal index:", month.seasonalIndex,
    "| Years used:", month.observations
  );
});

console.log("\n2. YEARLY SALES LEVELS");

result.seasonalProfile.yearlyProfiles.forEach(year => {
  console.log(
    "Year:", year.year,
    "| Average demand:", year.averageDemand,
    "| Usable months:", year.usableMonths
  );
});

console.log("\n3. SEASONAL CONSISTENCY");

result.seasonalConsistency.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Seasonal index:", month.averageSeasonalIndex,
    "| Variation:", month.variation,
    "| Consistency:", month.consistency
  );
});

console.log("\n4. RECENT SEASONAL CHANGE");

console.log(
  "Classification:",
  result.recentSeasonalChange.classification
);

console.log(
  "Confidence:",
  result.recentSeasonalChange.confidence
);

console.log(
  "Average change:",
  result.recentSeasonalChange.averageChange
);

console.log(
  "Valid comparisons:",
  result.recentSeasonalChange.validComparisons
);

console.log("\n5. SEASONAL PATTERN CHANGE");

console.log(
  "Classification:",
  result.seasonalPatternChange.classification
);

console.log(
  "Confidence:",
  result.seasonalPatternChange.confidence
);

console.log(
  "Peak shifted:",
  result.seasonalPatternChange.peakShift
);

console.log(
  "Strength change:",
  result.seasonalPatternChange.strengthChange
);

console.log(
  "Usable years:",
  result.seasonalPatternChange.usableYears
);

console.log("\n================================");
console.log("COMPLETE SEASONAL ANALYSIS FINISHED");
console.log("================================");
