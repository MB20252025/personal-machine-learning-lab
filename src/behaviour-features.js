
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

  // Calculate the overall trend.
  const xMean = (count - 1) / 2;

  let numerator = 0;
  let denominator = 0;

  sales.forEach((value, index) => {
    numerator += (index - xMean) * (value - mean);
    denominator += Math.pow(index - xMean, 2);
  });

  const slope = numerator / denominator;

  const relativeTrend = mean === 0
    ? 0
    : slope / mean;

  // For longer histories, compare yearly medians.
  if (count >= 24) {
    const firstMedian = median(sales.slice(0, 12));
    const lastMedian = median(sales.slice(-12));

    const trendBase = (firstMedian + lastMedian) / 2;

    // Use the robust yearly comparison for trend.
    // This reduces the influence of occasional spikes.
    const yearlyTrend = trendBase === 0
      ? 0
      : (lastMedian - firstMedian) / trendBase;

    // Retain the regression trend when the median comparison
    // is inconclusive.
    if (Math.abs(yearlyTrend) > 0.02) {
      // The yearly trend is used for the reported result.
      var reportedTrend = yearlyTrend;
    } else {
      var reportedTrend = relativeTrend;
    }
  } else {
    var reportedTrend = relativeTrend;
  }

  // Remove the fitted trend from each observation.
  const detrended = sales.map((value, index) => {
    const fitted = mean + slope * (index - xMean);
    return value - fitted;
  });

  let residuals = detrended.slice();

  // Remove repeating monthly patterns as well.
  if (count >= 24) {
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

  // Check whether the same 12-month pattern repeats.
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
    relativeTrend: Number(reportedTrend.toFixed(4)),
    relativeVolatility: Number(relativeVolatility.toFixed(4)),
    zeroRate: Number(zeroRate.toFixed(4)),
    seasonalCorrelation: seasonalCorrelation === null
      ? null
      : Number(seasonalCorrelation.toFixed(4))
  };
}

module.exports = extractBehaviourFeatures;
