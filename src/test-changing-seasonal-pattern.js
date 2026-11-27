
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const summerPattern = [
  50, 60, 80, 110, 150, 190,
  200, 180, 140, 100, 70, 50
];

const winterPattern = [
  180, 170, 140, 100, 70, 50,
  50, 60, 80, 110, 150, 190
];

const sales = [
  ...summerPattern,
  ...summerPattern,
  ...winterPattern
];

console.log("\n==============================");
console.log("CHANGING SEASONAL PATTERN TEST");
console.log("==============================");

const profile = analyseSeasonalProfile(sales);
const consistency = analyseSeasonalConsistency(sales);

console.log("\nYEARLY SALES PATTERNS");

[summerPattern, summerPattern, winterPattern].forEach(
  (year, index) => {
    const busiestMonth =
      year.indexOf(Math.max(...year)) + 1;

    console.log(
      "Year:", index + 1,
      "| Busiest month:", busiestMonth,
      "| Average demand:",
      (year.reduce((sum, value) => sum + value, 0) / 12).toFixed(2)
    );
  }
);

console.log("\nCOMBINED SEASONAL PROFILE");

profile.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Seasonal index:", month.seasonalIndex
  );
});

console.log("\nSEASONAL CONSISTENCY");

consistency.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Variation:", month.variation,
    "| Consistency:", month.consistency
  );
});

console.log("\nCHANGING SEASONAL PATTERN TEST COMPLETE");
