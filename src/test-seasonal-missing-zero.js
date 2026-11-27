
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const yearlyDemand = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

// Three years of seasonal demand.
const sales = [
  ...yearlyDemand,
  ...yearlyDemand,
  ...yearlyDemand
];

// Missing sales information.
sales[2] = null;
sales[15] = null;
sales[28] = null;

// Genuine months with zero recorded sales.
sales[5] = 0;
sales[17] = 0;
sales[29] = 0;

console.log("\n==============================");
console.log("SEASONAL MISSING AND ZERO TEST");
console.log("==============================");

const profile = analyseSeasonalProfile(sales);
const consistency = analyseSeasonalConsistency(sales);

console.log("\nDATA QUALITY");

console.log("Total months:", sales.length);
console.log(
  "Missing months:",
  sales.filter(value => value === null).length
);
console.log(
  "Zero-sales months:",
  sales.filter(value => value === 0).length
);
console.log(
  "Usable observations:",
  profile.usableObservations
);

console.log("\nSEASONAL PROFILE");

profile.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Index:", month.seasonalIndex,
    "| Observations:", month.observations
  );
});

console.log("\nSEASONAL CONSISTENCY");

consistency.months.forEach(month => {
  console.log(
    "Month:", month.month,
    "| Observations:", month.observations,
    "| Variation:", month.variation,
    "| Consistency:", month.consistency
  );
});

console.log("\nMISSING AND ZERO TEST COMPLETE");
