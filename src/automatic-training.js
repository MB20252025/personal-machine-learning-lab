
const compareModels = require("./model-comparison");

function automaticTraining({
  actual,
  currentPredictions,
  newPredictions,
  currentModel,
  newModel
}) {
  const comparison = compareModels(
    actual,
    currentPredictions,
    newPredictions
  );

  if (!comparison.keepNewModel) {
    return {
      updated: false,
      model: currentModel,
      reason: "Existing model performs better",
      comparison
    };
  }

  return {
    updated: true,
    model: newModel,
    reason: "New model performs better",
    comparison
  };
}

module.exports = automaticTraining;
