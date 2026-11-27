
function calculateMAE(actual, predicted) {
  if (
    actual.length === 0 ||
    actual.length !== predicted.length
  ) {
    throw new Error("Actual and predicted data must have equal, non-empty lengths");
  }

  const totalError = actual.reduce(
    (sum, value, index) =>
      sum + Math.abs(value - predicted[index]),
    0
  );

  return totalError / actual.length;
}

function compareModels(actual, oldPredictions, newPredictions) {
  const oldMAE = calculateMAE(actual, oldPredictions);
  const newMAE = calculateMAE(actual, newPredictions);

  const improvement =
    oldMAE === 0
      ? 0
      : ((oldMAE - newMAE) / oldMAE) * 100;

  return {
    oldMAE: Number(oldMAE.toFixed(2)),
    newMAE: Number(newMAE.toFixed(2)),
    improvement: Number(improvement.toFixed(2)),
    keepNewModel: newMAE < oldMAE
  };
}

module.exports = compareModels;
