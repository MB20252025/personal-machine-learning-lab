
function extractBehaviourFeatures(sales) {
  if (!Array.isArray(sales) || sales.length < 3) {
    throw new Error("At least 3 sales observations are required");
  }

  if (!sales.every(value =>
    Number.isFinite(value) && value >= 0
  )) {
    throw new Error("Sales must be valid non-negative numbers");
  }

  const count = sales.length;

  const mean =
    sales.reduce((sum, value) => sum + value, 0) / count;

  const variance =
    sales.reduce((sum, value) =>
      sum + Math.pow(value - mean, 2), 0
    ) / count;

  const standardDeviation = Math.sqrt(variance);

  // Measure the direction of demand.
  const xMean = (count - 1) / 2;

  let numerator = 0;
  let denominator = 0;

  sales.forEach((value, index) => {
    numerator += (index - xMean) * (value - mean);
    denominator += Math.pow(index - xMean, 2);
  });

  const slope = numerator / denominator;

  // Express the trend relative to average demand.
  const relativeTrend = mean === 0 ? 0 : slope / mean;

  // Measure changes between consecutive periods.
  const differences = sales.slice(1).map((value, index) =>
    value - sales[index]
  );

  const differenceMean =
    differences.reduce((sum, value) => sum + value, 0)
    / differences.length;

  const differenceVariance =
    differences.reduce((sum, value) =>
      sum + Math.pow(value - differenceMean, 2), 0
    ) / differences.length;

  const relativeVolatility = mean === 0
    ? 0
    : Math.sqrt(differenceVariance) / mean;

  // Measure how frequently demand is zero.
  const zeroRate =
    sales.filter(value => value === 0).length / count;

  // Check for a repeating 12-period pattern.
  let seasonalCorrelation = null;

  if (count >= 24) {
    const first = sales.slice(0, count - 12);
    const second = sales.slice(12);

    const firstMean =
      first.reduce((sum, value) => sum + value, 0)
      / first.length;

    const secondMean =
      second.reduce((sum, value) => sum + value, 0)
      / second.length;

    let cross = 0;
    let firstVariance = 0;
    let secondVariance = 0;

    for (let i = 0; i < first.length; i++) {
      const a = first[i] - firstMean;
      const b = second[i] - secondMean;

      cross += a * b;
      firstVariance += a * a;
      secondVariance += b * b;
    }

    const divisor = Math.sqrt(
      firstVariance * secondVariance
    );

    seasonalCorrelation =
      divisor === 0 ? null : cross / divisor;
  }

  return {
    observations: count,
    averageDemand: Number(mean.toFixed(2)),
    relativeTrend: Number(relativeTrend.toFixed(4)),
    relativeVolatility: Number(relativeVolatility.toFixed(4)),
    zeroRate: Number(zeroRate.toFixed(4)),
    seasonalCorrelation: seasonalCorrelation === null
      ? null
      : Number(seasonalCorrelation.toFixed(4))
  };
}

module.exports = extractBehaviourFeatures;
