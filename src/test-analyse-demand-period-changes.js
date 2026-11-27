
const analyseDemandPeriodChanges =
  require("./analyse-demand-period-changes");

const scenarios = [
  {
    name: "Stable demand",
    sales: [
      100, 102, 98, 101, 99,
      100, 101, 99, 102, 98,
      100, 101, 99, 100, 102,
      98, 101, 99, 100, 102,
      98, 101, 99, 100
    ]
  },
  {
    name: "Increasing demand",
    sales: [
      50, 55, 60, 65, 70,
      75, 80, 85, 90, 95,
      100, 105, 110, 115, 120,
      125, 130, 135, 140, 145,
      150, 155, 160, 165
    ]
  },
  {
    name: "Changing demand",
    sales: [
      100, 102, 98, 101, 99, 100,
      110, 120, 130, 140, 150, 160,
      155, 145, 135, 125, 115, 105,
      95, 85, 80, 82, 78, 81
    ]
  },
  {
    name: "Sudden demand increase",
    sales: [
      100, 102, 98, 101, 99, 100,
      101, 99, 102, 98, 100, 101,
      99, 100, 102, 105, 110, 115,
      120, 155, 160, 165, 170, 175
    ]
  }
];

console.log("DEMAND PERIOD CHANGE ANALYSIS");
console.log("==============================");

for (const scenario of scenarios) {
  const result = analyseDemandPeriodChanges(
    scenario.sales
  );

  console.log("\n" + scenario.name);
  console.log("------------------------------");

  console.log(
    "Historical behaviour:",
    result.historicalBehaviour
  );

  console.log(
    "Current behaviour:",
    result.currentBehaviour
  );

  console.log(
    "Previous average:",
    result.previousPeriod.average
  );

  console.log(
    "Recent average:",
    result.recentPeriod.average
  );

  console.log(
    "Percentage change:",
    result.demandChange.percentage
  );

  console.log(
    "Change classification:",
    result.demandChange.classification
  );

  console.log(
    "Behaviour changed:",
    result.behaviourChanged
  );
}
