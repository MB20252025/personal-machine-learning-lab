
const fs = require("fs");

// Load our training examples
const data = JSON.parse(
  fs.readFileSync("data/training-data.json", "utf8")
);

const examples = data.examples;

// Starting values: the machine knows nothing yet
let weight = 0;
let bias = 0;

// Learning settings
const learningRate = 0.01;
const iterations = 10000;

// Training process
for (let i = 0; i < iterations; i++) {
  let weightError = 0;
  let biasError = 0;

  for (const example of examples) {
    const prediction = weight * example.month + bias;
    const error = prediction - example.sales;

    weightError += error * example.month;
    biasError += error;
  }

  weightError /= examples.length;
  biasError /= examples.length;

  weight -= learningRate * weightError;
  bias -= learningRate * biasError;
}

// Create the models folder if it doesn't exist
fs.mkdirSync("models", { recursive: true });

// Save what the machine has learned
const model = {
  weight,
  bias,
  trainedOn: examples.length,
  iterations
};

fs.writeFileSync(
  "models/model.json",
  JSON.stringify(model, null, 2)
);

console.log("Training complete!");
console.log("Learned weight:", weight);
console.log("Learned bias:", bias);
console.log("Model saved.");
