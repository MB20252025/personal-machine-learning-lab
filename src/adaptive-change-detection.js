
const calculateChangeScore = require("./change-score");

function detectAdaptiveChange(actual, predicted, windowSize = 5) {
  if (actual.length !== predicted.length) {
    throw new Error("Actual and predicted data must have equal lengths");
  }

  if (actual.length < windowSize) {
    return {
      changed: false,
      reason: "Not enough data"
    };
  }

  const errors = actual.map(
    (value, index) => value - predicted[index]
  );

  const result = calculateChangeScore(errors, windowSize);

  return {
    ...result,
    changed: result.changed,
    direction:
      result.averageError > 0
        ? "Actual demand is higher than predicted"
        : result.averageError < 0
        ? "Actual demand is lower than predicted"
        : "No directional change",
    recentErrors: errors.slice(-windowSize)
  };
}

module.exports = detectAdaptiveChange;
