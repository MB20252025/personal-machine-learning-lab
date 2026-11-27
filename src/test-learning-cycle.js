
const fs = require("fs");
const runLearningCycle = require("./learning-cycle");

const data = JSON.parse(
  fs.readFileSync("data/training-data.json", "utf8")
);

// Use the first four examples for training
const trainingExamples = data.examples.slice(0, 4);

// Use the remaining examples for testing
const testExamples = data.examples.slice(4);

const currentModel = {
  weight: 5,
  bias: 50
};

const result = runLearningCycle({
  trainingExamples,
  testExamples,
  currentModel
});

console.log("AUTOMATIC LEARNING CYCLE");
console.log("Updated:", result.updated);
console.log("Reason:", result.reason);
console.log("Comparison:", result.comparison);
console.log("Selected model:", result.model);
