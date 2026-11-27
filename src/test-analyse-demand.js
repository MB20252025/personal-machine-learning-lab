
const analyseDemand = require("./analyse-demand");

const tests = [
  {
    name: "Stable demand",
    sales: Array(24).fill(100),
    expected: ["stable"]
  },
  {
    name: "Increasing demand",
    sales: [
      50, 55, 60, 65, 70, 75,
      80, 85, 90, 95, 100, 105,
      110, 115, 120, 125, 130, 135,
      140, 145, 150, 155, 160, 165
    ],
    expected: ["increasing"]
  },
  {
    name: "Stable demand with occasional spikes",
    sales: [
      100, 100, 100, 500, 100, 100,
      100, 100, 600, 100, 100, 100,
      100, 700, 100, 100, 100, 100,
      500, 100, 100, 100, 100, 600
    ],
    expected: ["stable", "spiky"]
  },
  {
    name: "Regularly volatile demand",
    sales: [
      60, 140, 70, 130, 65, 145,
      75, 135, 55, 150, 80, 125,
      60, 140, 70, 130, 65, 145,
      75, 135, 55, 150, 80, 125
    ],
    expected: ["stable", "possible-seasonality"]
  },
  {
    name: "Intermittent demand",
    sales: [
      0, 0, 100, 0, 0, 0,
      120, 0, 0, 0, 90, 0,
      0, 110, 0, 0, 0, 0,
      130, 0, 0, 0, 100, 0
    ],
    expected: ["intermittent"]
  }
];

console.log("\nSTRICT DEMAND ANALYSIS TEST\n");

let passed = 0;

for (const test of tests) {
  const result = analyseDemand(test.sales);

  const actual = [...result.patterns].sort();
  const expected = [...test.expected].sort();

  const success =
    JSON.stringify(actual) === JSON.stringify(expected);

  if (success) passed++;

  console.log(
    `${success ? "PASS" : "FAIL"}: ${test.name}`
  );

  console.log("Expected:", expected);
  console.log("Recognised:", actual);
  console.log("-------------------------");
}

console.log(`\nPassed: ${passed}/${tests.length}`);
