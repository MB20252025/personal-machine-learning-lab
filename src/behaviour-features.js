
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

  const divisor = Math.sqrt(firstVariance * secondVariance);

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

  const xMean = (count - 1) / 2;

  let numerator = 0;
  let denominator = 0;

  sales.forEach((value, index) => {
    numerator += (index - xMean) * (value - mean);
    denominator += Math.pow(index - xMean, 2);
  });

  const monthlySlope = denominator === 0
    ? 0
    : numerator / denominator;

  let reportedTrend = mean === 0
    ? 0
    : monthlySlope / mean;

  let trendSlope = monthlySlope;

  // For longer histories, estimate the trend using
  // complete yearly averages instead of seasonal peaks
  // and troughs within individual months.
  if (count >= 24) {
    const yearlyAverages = [];

    const completeYears = Math.floor(count / 12);

    for (let year = 0; year < completeYears; year++) {
      const yearSales = sales.slice(
        year * 12,
        (year + 1) * 12
      );

      const yearlyAverage =
        yearSales.reduce((sum, value) => sum + value, 0)
        / 12;

      yearlyAverages.push(yearlyAverage);
    }

    const firstYear = yearlyAverages[0];
    const lastYear = yearlyAverages[yearlyAverages.length - 1];

    const trendBase = (firstYear + lastYear) / 2;

    reportedTrend = trendBase === 0
      ? 0
      : (lastYear - firstYear) / trendBase;

    const yearlyMean =
      yearlyAverages.reduce((sum, value) => sum + value, 0)
      / yearlyAverages.length;

    const yearXMean = (yearlyAverages.length - 1) / 2;

    let yearlyNumerator = 0;
    let yearlyDenominator = 0;

    yearlyAverages.forEach((value, index) => {
      yearlyNumerator +=
        (index - yearXMean) * (value - yearlyMean);

      yearlyDenominator +=
        Math.pow(index - yearXMean, 2);
    });

    const yearlySlope = yearlyDenominator === 0
      ? 0
      : yearlyNumerator / yearlyDenominator;

    trendSlope = yearlySlope / 12;
  }

  // Remove the estimated underlying trend.
  const detrended = sales.map((value, index) => {
    const fitted = mean + trendSlope * (index - xMean);
    return value - fitted;
  });

  let seasonalCorrelation = null;
  let halfYearSimilarity = null;
  let possibleAnnualSeasonality = false;

  if (count >= 36) {
    const first = detrended.slice(0, count - 12);
    const second = detrended.slice(12);

    seasonalCorrelation =
      calculateCorrelation(first, second);

    // Compare the average demand shape in the first
    // six months with the second six months.
    const monthlyAverages = Array(12).fill(0);

    for (let month = 0; month < 12; month++) {
      const values = [];

      for (let i = month; i < count; i += 12) {
        values.push(detrended[i]);
      }

      monthlyAverages[month] =
        values.reduce((sum, value) => sum + value, 0)
        / values.length;
    }

    const firstHalf = monthlyAverages.slice(0, 6);
    const secondHalf = monthlyAverages.slice(6);

    const averageDifference =
      firstHalf.reduce((sum, value, index) =>
        sum + Math.abs(value - secondHalf[index]), 0
      ) / 6;

    const averageMagnitude =
      monthlyAverages.reduce((sum, value) =>
        sum + Math.abs(value), 0
      ) / 12;

    halfYearSimilarity = averageMagnitude === 0
      ? 0
      : 1 - Math.min(1, averageDifference / averageMagnitude);

    // A strong twelve-month correlation is not enough.
    // The two halves must also have different shapes.
    possibleAnnualSeasonality =
      seasonalCorrelation !== null &&
      seasonalCorrelation >= 0.7 &&
      halfYearSimilarity < 0.9;
  }

  // Remove a repeating annual pattern from volatility
  // calculations only when the evidence is sufficient.
  let residuals = detrended.slice();

  if (possibleAnnualSeasonality) {
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
      : Number(seasonalCorrelation.toFixed(4)),
    halfYearSimilarity: halfYearSimilarity === null
      ? null
      : Number(halfYearSimilarity.toFixed(4)),
    possibleAnnualSeasonality
  };
}

module.exports = extractBehaviourFeatures;
