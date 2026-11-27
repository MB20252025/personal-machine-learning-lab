
const calculateChangeScore = require("./change-score");

const tests = [
  {
    name: "Normal fluctuations",
    errors: [2, -3, 1, -2, 3]
  },
  {
    name: "Sudden demand drop",
    errors: [-40, -45, -50, -48, -55]
  },
  {
    name: "Sudden demand increase",
    errors: [35, 40, 45, 42, 50]
  },
  {
    name: "One unusual month",
    errors: [2, 3, -40, 1, 2]
  },
  {
    name: "Gradual change",
    errors: [-5, -12, -20, -30, -40]
  }
];

console.log("CHANGE SCORE TESTS");
console.log("==================");

for (const test of tests) {
  const result = calculateChangeScore(test.errors);

  console.log("\n" + test.name);
  console.log("Score:", result.score);
  console.log("Change detected:", result.changed);
  console.log("Average error:", result.averageError);
  console.log("Consistency:", result.consistency);
}
