
const extractBehaviourFeatures =
  require("./behaviour-features");

const tests = [
  {
    name: "Stable demand",
    sales: Array(24).fill(100)
  },
  {
    name: "Stable demand with occasional spikes",
    sales: [
      100, 100, 100, 500, 100, 100,
      100, 100, 600, 100, 100, 100,
      100, 700, 100, 100, 100, 100,
      500, 100, 100, 100, 100, 600
    ]
  },
  {
    name: "Genuine increasing demand",
    sales: [
      50, 55, 60, 65, 70, 75,
      80, 85, 90, 95, 100, 105,
      110, 115, 120, 125, 130, 135,
      140, 145, 150, 155, 160, 165
    ]
  }
];

for (const test of tests) {
  const result = extractBehaviourFeatures(test.sales);

  console.log("\n" + test.name);
  console.log("Trend:", result.relativeTrend);
  console.log("Volatility:", result.relativeVolatility);
}
