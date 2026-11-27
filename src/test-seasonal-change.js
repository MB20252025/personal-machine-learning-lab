
const detectSeasonalChange =
  require("./detect-seasonal-change");

const scenarios = [
  {
    name: "Normal seasonal demand",
    sales: [
      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60
    ]
  },
  {
    name: "Seasonal demand with recent increase",
    sales: [
      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 120, 90
    ]
  },
  {
    name: "Seasonal demand with recent decrease",
    sales: [
      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,

      50, 60, 80, 100, 130, 160,
      180, 170, 140, 50, 40, 30
    ]
  }
];

console.log("SEASONAL CHANGE DETECTION");
console.log("=========================");

for (const scenario of scenarios) {
  console.log("\n" + scenario.name);
  console.log("-------------------------");

  const result = detectSeasonalChange(
    scenario.sales
  );

  console.log(
    "Average change against previous years:",
    result.averageChange
  );

  console.log(
    "Classification:",
    result.classification
  );

  console.log(
    "Monthly comparisons:",
    result.comparisons
  );
}
