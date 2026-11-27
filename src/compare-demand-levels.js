
function compareDemandLevels(sales, recentWindowSize = 5) {
  if (!Array.isArray(sales) || sales.length < 5) {
    throw new Error("At least 5 observations are required");
  }

  if (
    !Number.isInteger(recentWindowSize) ||
    recentWindowSize < 5 ||
    recentWindowSize > sales.length
  ) {
    throw new Error("Invalid recent window size");
  }

  if (!sales.every(value =>
    Number.isFinite(value) && value >= 0
  )) {
    throw new Error("Sales must be valid non-negative numbers");
  }

  const overallAverage =
    sales.reduce((sum, value) => sum + value, 0)
    / sales.length;

  const recentSales = sales.slice(-recentWindowSize);

  const recentAverage =
    recentSales.reduce((sum, value) => sum + value, 0)
    / recentSales.length;

  const change = overallAverage === 0
    ? null
    : ((recentAverage - overallAverage) / overallAverage) * 100;

  return {
    overallAverage: Number(overallAverage.toFixed(2)),
    recentAverage: Number(recentAverage.toFixed(2)),
    percentageChange: change === null
      ? null
      : Number(change.toFixed(2))
  };
}

module.exports = compareDemandLevels;
