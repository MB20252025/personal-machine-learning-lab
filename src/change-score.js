
function calculateChangeScore(errors, windowSize = 5) {
  if (errors.length < windowSize) {
    return {
      score: 0,
      changed: false,
      reason: "Not enough data"
    };
  }

  const recent = errors.slice(-windowSize);

  const averageError =
    recent.reduce((sum, value) => sum + value, 0) /
    windowSize;

  const averageMagnitude =
    recent.reduce((sum, value) => sum + Math.abs(value), 0) /
    windowSize;

  const consistency =
    recent.filter(value => Math.sign(value) === Math.sign(averageError)).length /
    windowSize;

  const score =
    averageMagnitude === 0
      ? 0
      : Math.min(
          100,
          Math.abs(averageError) / averageMagnitude *
          consistency * 100
        );

  return {
    score: Number(score.toFixed(2)),
    changed: score >= 70 && averageMagnitude >= 10,
    averageError: Number(averageError.toFixed(2)),
    averageMagnitude: Number(averageMagnitude.toFixed(2)),
    consistency: Number(consistency.toFixed(2))
  };
}

module.exports = calculateChangeScore;
