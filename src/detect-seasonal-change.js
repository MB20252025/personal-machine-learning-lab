
function detectSeasonalChange(sales, recentWindowSize = 5) {
  if (!Array.isArray(sales) || sales.length < 36) {
    throw new Error("At least 36 observations are required");
  }

  if (!sales.every(value =>
    Number.isFinite(value) && value >= 0
  )) {
    throw new Error("Sales must be valid non-negative numbers");
  }

  if (
    !Number.isInteger(recentWindowSize) ||
    recentWindowSize < 1 ||
    recentWindowSize > 12
  ) {
    throw new Error("Invalid recent window size");
  }

  const recentStart = sales.length - recentWindowSize;
  const comparisons = [];

  for (let i = 0; i < recentWindowSize; i++) {
    const currentIndex = recentStart + i;
    const currentMonth = currentIndex % 12;
    const previousValues = [];

    for (
      let previousIndex = currentMonth;
      previousIndex < currentIndex;
      previousIndex += 12
    ) {
      previousValues.push(sales[previousIndex]);
    }

    if (previousValues.length === 0) continue;

    const previousAverage =
      previousValues.reduce((sum, value) => sum + value, 0)
      / previousValues.length;

    const currentValue = sales[currentIndex];

    const percentageChange = previousAverage === 0
      ? null
      : ((currentValue - previousAverage) / previousAverage) * 100;

    comparisons.push({
      month: currentIndex + 1,
      currentValue,
      previousAverage: Number(previousAverage.toFixed(2)),
      percentageChange: percentageChange === null
        ? null
        : Number(percentageChange.toFixed(2))
    });
  }

  const validChanges = comparisons
    .filter(item => item.percentageChange !== null)
    .map(item => item.percentageChange);

  const averageChange = validChanges.length === 0
    ? null
    : validChanges.reduce((sum, value) => sum + value, 0)
      / validChanges.length;

  const largestIncrease = validChanges.length === 0
    ? null
    : Math.max(...validChanges);

  const largestDecrease = validChanges.length === 0
    ? null
    : Math.min(...validChanges);

  let classification = "insufficient-comparison";

  if (averageChange !== null) {
    if (
      averageChange >= 30 ||
      largestIncrease >= 50
    ) {
      classification = "above-seasonal-level";
    } else if (
      averageChange <= -30 ||
      largestDecrease <= -50
    ) {
      classification = "below-seasonal-level";
    } else {
      classification = "within-seasonal-range";
    }
  }

  return {
    observations: sales.length,
    recentWindowSize,

    averageChange: averageChange === null
      ? null
      : Number(averageChange.toFixed(2)),

    largestIncrease,
    largestDecrease,

    classification,
    comparisons
  };
}

module.exports = detectSeasonalChange;
