
const analyseCurrentDemand =
  require("./current-demand-behaviour");

const tests = [
  {
    name: "Stable demand",
    sales: Array(24).fill(100)
  },
  {
    name: "Increasing demand",
    sales: [
      50, 55, 60, 65, 70, 75,
      80, 85, 90, 95, 100, 105,
      110, 115, 120, 125, 130, 135,
      140, 145, 150, 155, 160, 165
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
      100, 102, 98, 101, 99, 100,
      100, 102, 98, 101, 99, 100,
      150, 155, 160, 165, 170, 175
    ]
  }
];

console.log("\nCURRENT DEMAND BEHAVIOUR\n");

for (const test of tests) {
  const result = analyseCurrentDemand(test.sales);

  console.log("\n" + test.name);

  console.log(
    "Historical behaviour:",
    result.overallBehaviour
  );

  console.log(
    "Current behaviour:",
    result.currentBehaviour
  );

  console.log(
    "Recent period:",
    result.recentPeriod.startMonth,
    "to",
    result.recentPeriod.endMonth
  );

  console.log("-------------------------");
}
