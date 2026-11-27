
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
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

  // Measure the underlying trend.
  let relativeTrend;

  if (count >= 24) {
    const firstYear = sales.slice(0, 12);
    const lastYear = sales.slice(-12);

    const firstMedian = median(firstYear);
    const lastMedian = median(lastYear);

    const trendBase = (firstMedian + lastMedian) / 2;

    relativeTrend = trendBase === 0
      ? 0
      : (lastMedian - firstMedian) / trendBase;
  } else {
    const xMean = (count - 1) / 2;

    let numerator = 0;
    let denominator = 0;

    sales.forEach((value, index) => {
      numerator += (index - xMean) * (value - mean);
      denominator += Math.pow(index - xMean, 2);
    });

    const slope = numerator / denominator;

    relativeTrend = mean === 0 ? 0 : slope / mean;
  }

  // Remove average monthly patterns to measure
  // irregular variation rather than regular seasonality.
  let residuals = sales.slice();

  if (count >= 24) {
    const seasonalAverages = Array(12).fill(0);

    for (let month = 0; month < 12; month++) {
      const values = [];

      for (let i = month; i < count; i += 12) {
        values.push(sales[i]);
      }

      seasonalAverages[month] =
        values.reduce((sum, value) => sum + value, 0)
        / values.length;
    }

    residuals = sales.map((value, index) =>
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

  // Check whether the same 12-month pattern repeats.
  let seasonalCorrelation = null;

  if (count >= 24) {
    const first = sales.slice(0, count - 12);
    const second = sales.slice(12);

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

    const divisor = Math.sqrt(firstVariance * secondVariance);

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
