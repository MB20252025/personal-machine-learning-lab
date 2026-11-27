
const recogniseMixedPatterns =
  require("./recognise-mixed-patterns");

const tests = [
  {
    name: "Increasing with seasonal peaks",
    sales: [
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60,
      70, 80, 100, 120, 140, 160,
      180, 170, 150, 130, 100, 80
    ],
    expected: ["increasing", "possible-seasonality"]
  },
  {
    name: "Stable with occasional huge orders",
    sales: [
      100, 100, 100, 500, 100, 100,
      100, 100, 600, 100, 100, 100,
      100, 700, 100, 100, 100, 100,
      500, 100, 100, 100, 100, 600
    ],
    expected: ["stable", "volatile"]
  },
  {
    name: "Declining with volatility",
    sales: [
      200, 120, 190, 110, 180, 100,
      170, 90, 160, 80, 150, 70,
      140, 60, 130, 50, 120, 40,
      110, 30, 100, 20, 90, 10
    ],
    expected: ["declining", "volatile"]
  },
  {
    name: "Pure seasonal",
    sales: [
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60,
      50, 60, 80, 100, 120, 140,
      160, 150, 130, 110, 80, 60
    ],
    expected: ["stable", "possible-seasonality"]
  }
];

console.log("\nMIXED PATTERN RECOGNITION\n");

let passed = 0;

for (const test of tests) {
  const result = recogniseMixedPatterns(test.sales);

  const success =
    test.expected.every(pattern =>
      result.patterns.includes(pattern)
    );

  if (success) passed++;

  console.log(
    `${success ? "PASS" : "FAIL"}: ${test.name}`
  );

  console.log("Expected:", test.expected);
  console.log("Recognised:", result.patterns);
  console.log("-------------------------");
}

console.log(`\nPassed: ${passed}/${tests.length}`);
