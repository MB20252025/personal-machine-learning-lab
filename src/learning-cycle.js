
const trainModel = require("./train-model");
const compareModels = require("./model-comparison");

function runLearningCycle({
  trainingExamples,
  testExamples,
  currentModel
}) {
  // Train a replacement model
  const newModel = trainModel(trainingExamples);

  // Test both models against the same unseen examples
  const actual = testExamples.map(example => example.sales);

  const currentPredictions = testExamples.map(
    example => currentModel.weight * example.month + currentModel.bias
  );

  const newPredictions = testExamples.map(
    example => newModel.weight * example.month + newModel.bias
  );

  // Compare their accuracy
  const comparison = compareModels(
    actual,
    currentPredictions,
    newPredictions
  );

  // Keep whichever model performs better
  return {
    model: comparison.keepNewModel ? newModel : currentModel,
    updated: comparison.keepNewModel,
    reason: comparison.keepNewModel
      ? "New model performs better"
      : "Existing model performs better",
    comparison
  };
}

module.exports = runLearningCycle;
