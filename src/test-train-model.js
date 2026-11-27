
const fs = require("fs");
const trainModel = require("./train-model");

const data = JSON.parse(
  fs.readFileSync("data/training-data.json", "utf8")
);

const model = trainModel(data.examples);

console.log("REUSABLE TRAINING TEST");
console.log("Learned weight:", model.weight);
console.log("Learned bias:", model.bias);
console.log("Training examples:", model.trainedOn);
console.log("Iterations:", model.iterations);

console.log("\nExpected relationship: sales = 10 × month + 90");
