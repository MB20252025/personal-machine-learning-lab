
const calculateBehaviourConfidence =
  require("./behaviour-confidence");

const tests = [
  {
    name: "Strong growth",
    sales: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
  },
  {
    name: "Weak growth",
    sales: [100, 101, 100, 102, 101, 103, 102, 104, 103, 105, 104, 106]
  },
  {
    name: "Stable demand",
    sales: [100, 101, 99, 100, 101, 99, 100, 101, 99, 100, 101, 99]
  },
  {
    name: "Volatile demand",
    sales: [50, 150, 55, 145, 60, 140, 50, 155, 45, 150, 55, 145]
  },
  {
    name: "Intermittent demand",
    sales: [0, 0, 20, 0, 0, 30, 0, 0, 25, 0, 0, 35]
  },
  {
    name: "Short history",
    sales: [20, 25, 30, 35]
  }
];

console.log("\nBEHAVIOUR CONFIDENCE TEST\n");

for (const test of tests) {
  const result = calculateBehaviourConfidence(test.sales);

  console.log(test.name);
  console.log("Recognised:", result.behaviour);
  console.log("Confidence:", result.confidence + "%");
  console.log("Level:", result.level);
  console.log("-------------------------");
}
