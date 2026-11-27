
const updateModelHistory = require("./model-manager");

let history = [];

console.log("MODEL MANAGER TEST");
console.log("==================");

// First model
const model1 = {
  weight: 10,
  bias: 90
};

const metrics1 = {
  mae: 12,
  rmse: 15
};

let result = updateModelHistory(
  history,
  model1,
  metrics1
);

history = result.history;

console.log("\nFirst model:");
console.log(result);

// Second model
const model2 = {
  weight: 9.8,
  bias: 92
};

const metrics2 = {
  mae: 8,
  rmse: 10
};

result = updateModelHistory(
  history,
  model2,
  metrics2
);

history = result.history;

console.log("\nSecond model:");
console.log(result);

// Third model (worse)
const model3 = {
  weight: 8,
  bias: 100
};

const metrics3 = {
  mae: 20,
  rmse: 25
};

result = updateModelHistory(
  history,
  model3,
  metrics3
);

history = result.history;

console.log("\nThird model:");
console.log(result);

console.log("\nFINAL BEST MODEL:");
console.log(result.bestModel);
