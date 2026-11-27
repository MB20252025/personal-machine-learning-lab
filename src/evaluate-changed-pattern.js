
const fs = require("fs");

// Load the new test data
const data = JSON.parse(
  fs.readFileSync("data/changed-pattern-test-data.json", "utf8")
);

// Load our existing model - no retraining!
const model = JSON.parse(
  fs.readFileSync("models/noisy-model.json", "utf8")
);

let totalAbsoluteError = 0;

console.log("EXPERIMENT 3 - CHANGED PATTERN");
console.log("--------------------------------");

for (const example of data.examples) {
  const predicted =
    model.weight * example.month + model.bias;

  const actual = example.sales;
  const error = predicted - actual;

  totalAbsoluteError += Math.abs(error);

  console.log(
    `Month ${example.month}: Actual ${actual}, Predicted ${predicted.toFixed(2)}, Error ${error.toFixed(2)}`
  );
}

const mae = totalAbsoluteError / data.examples.length;

console.log("\nTEST RESULTS");
console.log("--------------------------------");
console.log("Mean absolute error:", mae.toFixed(4));
