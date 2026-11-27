
const analyseDemand = require("./analyse-demand");

const tests = [
  {
    name: "Genuine annual seasonality",
    sales: [
      50, 60, 80, 100, 130, 150, 170, 160, 130, 100, 80, 60,
      52, 62, 82, 102, 132, 152, 172, 162, 132, 102, 82, 62,
      48, 58, 78, 98, 128, 148, 168, 158, 128, 98, 78, 58
    ]
  },
  {
    name: "Repeating six-month pattern",
    sales: [
      20, 180, 40, 220, 60, 200,
      20, 180, 40, 220, 60, 200,
      20, 180, 40, 220, 60, 200,
      20, 180, 40, 220, 60, 200,
      20, 180, 40, 220, 60, 200,
      20, 180, 40, 220, 60, 200
    ]
  },
  {
    name: "Irregular demand",
    sales: [
      40, 180, 70, 220, 30, 150, 90, 260, 50, 190, 110, 80,
      210, 60, 170, 35, 240, 100, 55, 200, 75, 130, 25, 180,
      95, 230, 45, 160, 85, 270, 30, 140, 105, 195, 65, 220
    ]
  }
];

for (const test of tests) {
  const result = analyseDemand(test.sales);

  console.log("\n" + test.name);
  console.log("------------------------------");
  console.log("Recognised patterns:", result.patterns);
  console.log("Seasonal correlation:", result.features.seasonalCorrelation);
  console.log("Relative volatility:", result.features.relativeVolatility);
}
