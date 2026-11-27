
const calculateBehaviourConfidence =
  require("./behaviour-confidence");

const tests = [
  {
    name: "Small growth",
    sales: [20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
  },
  {
    name: "Large growth",
    sales: [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300]
  },
  {
    name: "Small stable",
    sales: [20, 21, 19, 20, 21, 19, 20, 21, 19, 20, 21, 19]
  },
  {
    name: "Large stable",
    sales: [200, 210, 190, 200, 210, 190, 200, 210, 190, 200, 210, 190]
  }
];

console.log("\nCONFIDENCE SCALE TEST\n");

for (const test of tests) {
  const result = calculateBehaviourConfidence(test.sales);

  console.log(test.name);
  console.log("Behaviour:", result.behaviour);
  console.log("Confidence:", result.confidence + "%");
  console.log("Level:", result.level);
  console.log("-------------------------");
}
