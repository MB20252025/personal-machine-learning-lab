
const calculateChangeScore = require("./change-score");
const detectAdaptiveChange = require("./adaptive-change-detection");
const decideRetraining = require("./retraining-controller");
const compareModels = require("./model-comparison");

console.log("ADAPTIVE MACHINE LEARNING TEST");
console.log("==============================");

// Test 1: Random fluctuations
const normal = calculateChangeScore([
  2, -3, 1, -2, 3
]);

console.log("\n1. Normal fluctuations");
console.log(normal);

// Test 2: Genuine demand change
const changed = calculateChangeScore([
  -40, -45, -50, -48, -55
]);

console.log("\n2. Genuine change");
console.log(changed);

// Test 3: Adaptive detection
const detection = detectAdaptiveChange(
  [60, 55, 50, 52, 45],
  [100, 100, 100, 100, 100]
);

console.log("\n3. Adaptive detection");
console.log(detection);

// Test 4: Retraining decision
const decision = decideRetraining(
  changed,
  70
);

console.log("\n4. Retraining decision");
console.log(decision);

// Test 5: Model comparison
const comparison = compareModels(
  [100, 110, 120, 130],
  [120, 130, 140, 150],
  [102, 112, 118, 132]
);

console.log("\n5. Model comparison");
console.log(comparison);

console.log("\nALL EXPERIMENTS COMPLETED");
