
const completeSeasonalAnalysis =
  require("./complete-seasonal-analysis");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Three years of seasonal demand with gradual growth.
const sales = [
  ...yearlyDemand,
  ...yearlyDemand.map(value => value * 1.1),
  ...yearlyDemand.map(value => value * 1.2)
];

// Introduce a recent increase in the final two months.
sales[34] = 180;
sales[35] = 135;

console.log("\n==============================");
console.log("COMPLETE SEASONAL ANALYSIS");
console.log("==============================");

const result = completeSeasonalAnalysis(sales);

console.log("\n1. SEASONAL PROFILE");

console.log(
  "Overall average demand:",
  result.seasonalProfile.overallAverageDemand
);

result.seasonalProfile.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Average:", month.averageDemand,
    "| Seasonal index:", month.seasonalIndex
  );
});

console.log("\n2. SEASONAL CONSISTENCY");

result.seasonalConsistency.yearlyProfiles.forEach(year => {
  console.log(
    "Year:", year.year,
    "| Average demand:", year.averageDemand,
    "| Usable months:", year.usableMonths
  );
});

result.seasonalConsistency.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Seasonal index:", month.averageSeasonalIndex,
    "| Variation:", month.variation,
    "| Consistency:", month.consistency
  );
});

console.log("\n3. RECENT SEASONAL CHANGE");

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
  "Largest increase:",
  result.recentSeasonalChange.largestIncrease
);

console.log(
  "Largest decrease:",
  result.recentSeasonalChange.largestDecrease
);

console.log(
  "Valid comparisons:",
  result.recentSeasonalChange.validComparisons
);

console.log("\nCOMPLETE SEASONAL ANALYSIS FINISHED");
