
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
  },
  {
    name: "Seasonal demand",
    sales: [
      50, 60, 80, 100, 130, 160,
      180, 170, 140, 110, 80, 60,
      55, 65, 85, 105, 135, 165,
      185, 175, 145, 115, 85, 65
    ]
  },
  {
    name: "Intermittent demand",
    sales: [
      0, 0, 20, 0, 0, 35,
      0, 0, 0, 25, 0, 0,
      0, 40, 0, 0, 30, 0,
      0, 0, 45, 0, 0, 20
    ]
  },
  {
    name: "Volatile demand",
    sales: [
      150, 55, 140, 65, 130, 70,
      145, 60, 155, 50, 135, 75,
      160, 55, 125, 70, 150, 60,
      140, 65, 155, 50, 130, 80
    ]
  },
  {
    name: "Noisy increasing demand",
    sales: [
      45, 60, 52, 70, 63, 78,
      72, 90, 82, 100, 92, 110,
      105, 125, 115, 135, 128, 145,
      138, 160, 150, 170, 162, 180
    ]
  }
];

console.log("DEMAND PERIOD CHANGE ANALYSIS");
console.log("==============================");

for (const scenario of scenarios) {
  console.log("\n" + scenario.name);
  console.log("------------------------------");

  try {
    const result = analyseDemandPeriodChanges(
      scenario.sales
    );

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
  } catch (error) {
    console.log("ERROR:", error.message);
  }
}
