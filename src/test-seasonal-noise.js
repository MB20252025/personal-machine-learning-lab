
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const baseDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Small, realistic fluctuations around the underlying pattern.
const noise = [
  1.04, 0.97, 1.03, 0.96,
  1.02, 0.98, 1.05, 0.95,
  1.03, 0.97, 1.04, 0.96
];

const sales = [];

for (let year = 0; year < 3; year++) {
  baseDemand.forEach((value, month) => {
    const adjustedValue =
      value * noise[(month + year * 3) % 12];

    sales.push(Number(adjustedValue.toFixed(2)));
  });
}

console.log("\n==============================");
console.log("NOISY SEASONAL DEMAND TEST");
console.log("==============================");

const profile = analyseSeasonalProfile(sales);
const consistency = analyseSeasonalConsistency(sales);

console.log("\nSEASONAL PROFILE");

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

console.log("\nNOISY SEASONAL TEST COMPLETE");
