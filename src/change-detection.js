
function detectChange(actual, predicted, windowSize = 3) {
  if (actual.length < windowSize || predicted.length < windowSize) {
    return {
      changed: false,
      reason: "Not enough data"
    };
  }

  const errors = actual.map((value, index) =>
    value - predicted[index]
  );

  const recentErrors = errors.slice(-windowSize);

  const consistentlyPositive = recentErrors.every(
    error => error > 0
  );

  const consistentlyNegative = recentErrors.every(
    error => error < 0
  );

  return {
    changed: consistentlyPositive || consistentlyNegative,
    direction: consistentlyPositive
      ? "Actual demand is consistently higher"
      : consistentlyNegative
        ? "Actual demand is consistently lower"
        : "No consistent change detected",
    recentErrors
  };
}

module.exports = detectChange;
