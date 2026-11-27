
const recogniseBehaviour =
  require("./recognise-behaviour");

const extractBehaviourFeatures =
  require("./behaviour-features");

const tests = [
  {
    name: "Increasing with seasonal peaks",
    sales: [
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60,
      70, 80, 100, 120, 140, 160,
      180, 170, 150, 130, 100, 80
    ]
  },
  {
    name: "Stable with occasional huge orders",
    sales: [
      100, 100, 100, 500, 100, 100,
      100, 100, 600, 100, 100, 100,
      100, 700, 100, 100, 100, 100,
      500, 100, 100, 100, 100, 600
    ]
  },
  {
    name: "Declining with high volatility",
    sales: [
      200, 120, 190, 110, 180, 100,
      170, 90, 160, 80, 150, 70,
      140, 60, 130, 50, 120, 40,
      110, 30, 100, 20, 90, 10
    ]
  },
  {
    name: "Seasonal demand",
    sales: [
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60,
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60
    ]
  }
];

console.log("\nMIXED PATTERN TEST\n");

for (const test of tests) {
  const result = recogniseBehaviour(test.sales);
  const features = extractBehaviourFeatures(test.sales);

  console.log("\n" + test.name);
  console.log("Recognised:", result.behaviour);
  console.log("Trend:", features.relativeTrend);
  console.log("Volatility:", features.relativeVolatility);
  console.log("Seasonal correlation:", features.seasonalCorrelation);
  console.log("-------------------------");
}
