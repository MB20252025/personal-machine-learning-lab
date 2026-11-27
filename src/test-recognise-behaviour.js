
const recogniseBehaviour =
  require("./recognise-behaviour");

const tests = [
  {
    name: "Small growth",
    sales: [20, 21, 22, 23, 24, 25],
    expected: "increasing"
  },
  {
    name: "Large growth",
    sales: [200, 210, 220, 230, 240, 250],
    expected: "increasing"
  },
  {
    name: "Declining",
    sales: [250, 240, 230, 220, 210, 200],
    expected: "declining"
  },
  {
    name: "Stable",
    sales: [100, 101, 99, 100, 101, 99],
    expected: "stable"
  },
  {
    name: "Intermittent",
    sales: [0, 0, 20, 0, 0, 30, 0, 0],
    expected: "intermittent"
  },
  {
    name: "Volatile",
    sales: [50, 150, 55, 145, 60, 140, 50, 155],
    expected: "volatile"
  }
];

console.log("\nBEHAVIOUR RECOGNITION RESULTS\n");

let passed = 0;

for (const test of tests) {
  const result = recogniseBehaviour(test.sales);
  const success = result.behaviour === test.expected;

  if (success) passed++;

  console.log(
    `${success ? "PASS" : "FAIL"}: ${test.name}`
  );

  console.log("Expected:", test.expected);
  console.log("Recognised:", result.behaviour);
  console.log("-------------------------");
}

console.log(`\nPassed: ${passed}/${tests.length}`);
