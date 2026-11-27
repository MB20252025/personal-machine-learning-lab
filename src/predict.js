
const fs = require("fs");

// Load the trained machine
const model = JSON.parse(
  fs.readFileSync("models/model.json", "utf8")
);

// Choose the month we want to predict
const month = 7;

// Make a prediction using what the machine learned
const prediction = model.weight * month + model.bias;

console.log("Machine learning prediction");
console.log("---------------------------");
console.log("Month:", month);
console.log("Predicted sales:", prediction.toFixed(2));
