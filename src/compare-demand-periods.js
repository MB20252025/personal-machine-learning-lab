
function compareDemandPeriods(sales, periodSize = 5) {
  if (!Array.isArray(sales) || sales.length < periodSize * 2) {
    throw new Error("Not enough observations for two periods");
  }

  if (
    !Number.isInteger(periodSize) ||
    periodSize < 2 ||
    periodSize * 2 > sales.length
  ) {
    throw new Error("Invalid period size");
  }

  if (!sales.every(value =>
    Number.isFinite(value) && value >= 0
  )) {
    throw new Error("Sales must be valid non-negative numbers");
  }

  const previousSales = sales.slice(
    -(periodSize * 2),
    -periodSize
  );

  const recentSales = sales.slice(-periodSize);

  const previousAverage =
    previousSales.reduce((sum, value) => sum + value, 0)
    / previousSales.length;

  const recentAverage =
    recentSales.reduce((sum, value) => sum + value, 0)
    / recentSales.length;

  const percentageChange = previousAverage === 0
    ? null
    : ((recentAverage - previousAverage) / previousAverage) * 100;

  return {
    previousPeriod: {
      observations: previousSales.length,
      average: Number(previousAverage.toFixed(2))
    },

    recentPeriod: {
      observations: recentSales.length,
      average: Number(recentAverage.toFixed(2))
    },

    percentageChange: percentageChange === null
      ? null
      : Number(percentageChange.toFixed(2))
  };
}

module.exports = compareDemandPeriods;
