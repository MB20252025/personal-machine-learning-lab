
const fs = require("fs");

// Load training data and trained model
const data = JSON.parse(
  fs.readFileSync("data/training-data.json", "utf8")
);

const model = JSON.parse(
  fs.readFileSync("models/model.json", "utf8")
);

// Calculate prediction errors
let totalError = 0;
let totalAbsoluteError = 0;
let totalSquaredError = 0;

console.log("MODEL EVALUATION");
console.log("----------------");

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

console.log("\nRESULTS");
console.log("----------------");
console.log("Mean absolute error:", mae.toFixed(4));
console.log("Root mean squared error:", rmse.toFixed(4));
console.log("Average error:", averageError.toFixed(4));
