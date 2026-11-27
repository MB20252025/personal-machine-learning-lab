
function decideRetraining(changeResult, currentModelScore, minimumScore = 70) {
  if (!changeResult || changeResult.score === undefined) {
    return {
      retrain: false,
      reason: "No valid change assessment"
    };
  }

  if (!changeResult.changed) {
    return {
      retrain: false,
      reason: "No significant change detected"
    };
  }

  if (changeResult.score < minimumScore) {
    return {
      retrain: false,
      reason: "Change evidence is too weak"
    };
  }

  return {
    retrain: true,
    reason: "Significant change detected",
    currentModelScore
  };
}

module.exports = decideRetraining;
