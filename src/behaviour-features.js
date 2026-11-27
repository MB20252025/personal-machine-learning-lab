
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function calculateCorrelation(first, second) {
  const firstMean =
    first.reduce((sum, value) => sum + value, 0) / first.length;

  const secondMean =
    second.reduce((sum, value) => sum + value, 0) / second.length;

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

  return divisor === 0 ? null : cross / divisor;
}

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

  const zeroRate =
    sales.filter(value => value === 0).length / count;

  // Calculate the overall trend.
  const xMean = (count - 1) / 2;

  let numerator = 0;
  let denominator = 0;

  sales.forEach((value, index) => {
    numerator += (index - xMean) * (value - mean);
    denominator += Math.pow(index - xMean, 2);
  });

  const slope = denominator === 0
    ? 0
    : numerator / denominator;

  const relativeTrend = mean === 0
    ? 0
    : slope / mean;

  let reportedTrend = relativeTrend;

  // Use yearly medians to reduce the influence
  // of occasional unusually large orders.
  if (count >= 24) {
    const firstMedian = median(sales.slice(0, 12));
    const lastMedian = median(sales.slice(-12));

    const trendBase = (firstMedian + lastMedian) / 2;

    const yearlyTrend = trendBase === 0
      ? 0
      : (lastMedian - firstMedian) / trendBase;

    if (Math.abs(yearlyTrend) > 0.02) {
      reportedTrend = yearlyTrend;
    }
  }

  // Remove the fitted overall trend.
  const detrended = sales.map((value, index) => {
    const fitted = mean + slope * (index - xMean);
    return value - fitted;
  });

  // Annual seasonality requires at least three
  // complete years of observations.
  let seasonalCorrelation = null;

  if (count >= 36) {
    const first = detrended.slice(0, count - 12);
    const second = detrended.slice(12);

    seasonalCorrelation =
      calculateCorrelation(first, second);
  }

  // Only remove a seasonal pattern from volatility
  // calculations when there is reasonable evidence
  // that the pattern actually repeats.
  let residuals = detrended.slice();

  if (
    seasonalCorrelation !== null &&
    seasonalCorrelation >= 0.7
  ) {
    const seasonalAverages = Array(12).fill(0);

    for (let month = 0; month < 12; month++) {
      const values = [];

      for (let i = month; i < count; i += 12) {
        values.push(detrended[i]);
      }

      seasonalAverages[month] =
        values.reduce((sum, value) => sum + value, 0)
        / values.length;
    }

    residuals = detrended.map((value, index) =>
      value - seasonalAverages[index % 12]
    );
  }

  const residualMean =
    residuals.reduce((sum, value) => sum + value, 0)
    / count;

  const residualVariance =
    residuals.reduce((sum, value) =>
      sum + Math.pow(value - residualMean, 2), 0
    ) / count;

  const relativeVolatility = mean === 0
    ? 0
    : Math.sqrt(residualVariance) / mean;

  return {
    observations: count,
    averageDemand: Number(mean.toFixed(2)),
    relativeTrend: Number(reportedTrend.toFixed(4)),
    relativeVolatility: Number(relativeVolatility.toFixed(4)),
    zeroRate: Number(zeroRate.toFixed(4)),
    seasonalCorrelation: seasonalCorrelation === null
      ? null
      : Number(seasonalCorrelation.toFixed(4))
  };
}

module.exports = extractBehaviourFeatures;
