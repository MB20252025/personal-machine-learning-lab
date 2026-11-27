
function detectSeasonalChange(sales, recentWindowSize = 5) {
  if (!Array.isArray(sales) || sales.length < 36) {
    throw new Error("At least 36 observations are required");
  }

  if (!sales.every(value =>
    value === null ||
    (Number.isFinite(value) && value >= 0)
  )) {
    throw new Error(
      "Sales must be non-negative numbers or null for missing data"
    );
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
  let skippedMissingData = 0;
  let skippedZeroBaseline = 0;

  for (let i = 0; i < recentWindowSize; i++) {
    const currentIndex = recentStart + i;
    const previousYearIndex = currentIndex - 12;

    if (previousYearIndex < 0) {
      skippedMissingData++;
      continue;
    }

    const currentValue = sales[currentIndex];
    const previousValue = sales[previousYearIndex];

    if (
      currentValue === null ||
      previousValue === null
    ) {
      skippedMissingData++;
      continue;
    }

    if (previousValue === 0) {
      skippedZeroBaseline++;

      comparisons.push({
        month: currentIndex + 1,
        currentValue,
        previousYearValue: previousValue,
        percentageChange: null,
        reason: "zero-previous-year-sales"
      });

      continue;
    }

    const percentageChange =
      ((currentValue - previousValue) / previousValue) * 100;

    comparisons.push({
      month: currentIndex + 1,
      currentValue,
      previousYearValue: previousValue,
      percentageChange: Number(percentageChange.toFixed(2)),
      reason: null
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

    validComparisons: validChanges.length,
    skippedMissingData,
    skippedZeroBaseline,

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
