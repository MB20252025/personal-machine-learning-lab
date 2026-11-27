
const fs = require("fs");

// Load unseen noisy test data
const data = JSON.parse(
  fs.readFileSync("data/noisy-test-data.json", "utf8")
);

// Load the second trained model
const model = JSON.parse(
  fs.readFileSync("models/noisy-model.json", "utf8")
);

let totalAbsoluteError = 0;
let totalSquaredError = 0;
let totalError = 0;

console.log("EXPERIMENT 2 - UNSEEN DATA TEST");
console.log("--------------------------------");

for (const example of data.examples) {
  const predicted =
    model.weight * example.month + model.bias;

  const actual = example.sales;
  const error = predicted - actual;

  totalError += error;
  totalAbsoluteError += Math.abs(error);
  totalSquaredError += error * error;

  console.log(
    `Month ${example.month}: Actual ${actual}, Predicted ${predicted.toFixed(2)}, Error ${error.toFixed(2)}`
  );
}

const count = data.examples.length;

const mae = totalAbsoluteError / count;
const rmse = Math.sqrt(totalSquaredError / count);
const averageError = totalError / count;

console.log("\nTEST RESULTS");
console.log("--------------------------------");
console.log("Test examples:", count);
console.log("Mean absolute error:", mae.toFixed(4));
console.log("Root mean squared error:", rmse.toFixed(4));
console.log("Average error:", averageError.toFixed(4));
