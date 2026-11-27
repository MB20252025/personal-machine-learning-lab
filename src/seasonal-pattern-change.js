
function analyseYear(sales) {
  const validSales = sales.filter(
    value => value !== null
  );

  if (validSales.length < 9) {
    return null;
  }

  const average =
    validSales.reduce((sum, value) => sum + value, 0)
    / validSales.length;

  if (average === 0) {
    return null;
  }

  const indices = sales.map(value =>
    value === null ? null : value / average
  );

  const validIndices = indices.filter(
    value => value !== null
  );

  const peak = Math.max(...validIndices);
  const trough = Math.min(...validIndices);

  const seasonalRange = peak - trough;

  const peakMonths = indices
    .map((value, index) => ({
      month: index + 1,
      index: value
    }))
    .filter(item =>
      item.index !== null &&
      Math.abs(item.index - peak) < 0.000001
    )
    .map(item => item.month);

  const hasSeasonality = seasonalRange >= 0.2;

  return {
    averageDemand: Number(average.toFixed(2)),
    indices,
    peakIndex: Number(peak.toFixed(3)),
    troughIndex: Number(trough.toFixed(3)),
    seasonalRange: Number(seasonalRange.toFixed(3)),
    hasSeasonality,
    peakMonths: hasSeasonality ? peakMonths : []
  };
}

function detectSeasonalPatternChange(sales) {
  if (!Array.isArray(sales) || sales.length < 36) {
    throw new Error(
      "At least 36 months of history are required"
    );
  }

  if (!sales.every(value =>
    value === null ||
    (Number.isFinite(value) && value >= 0)
  )) {
    throw new Error(
      "Sales must be non-negative numbers or null"
    );
  }

  const numberOfYears = Math.floor(sales.length / 12);
  const yearlyProfiles = [];

  for (let year = 0; year < numberOfYears; year++) {
    const yearSales = sales.slice(
      year * 12,
      (year + 1) * 12
    );

    const profile = analyseYear(yearSales);

    yearlyProfiles.push({
      year: year + 1,
      ...(
        profile || {
          averageDemand: null,
          indices: null,
          peakIndex: null,
          troughIndex: null,
          seasonalRange: null,
          hasSeasonality: false,
          peakMonths: []
        }
      )
    });
  }

  const usableProfiles = yearlyProfiles.filter(
    profile => profile.indices !== null
  );

  let classification = "insufficient-evidence";
  let confidence = "insufficient";
  let peakShift = false;
  let strengthChange = null;

  if (usableProfiles.length >= 3) {
    const first = usableProfiles[0];
    const latest = usableProfiles[usableProfiles.length - 1];

    strengthChange = Number(
      (latest.seasonalRange - first.seasonalRange).toFixed(3)
    );

    if (!first.hasSeasonality && latest.hasSeasonality) {
      classification = "seasonality-emerging";
    } else if (first.hasSeasonality && !latest.hasSeasonality) {
      classification = "seasonality-disappearing";
    } else if (!first.hasSeasonality && !latest.hasSeasonality) {
      classification = "no-clear-seasonal-change";
    } else {
      const firstPeak = first.peakMonths[0];
      const latestPeak = latest.peakMonths[0];

      peakShift = firstPeak !== latestPeak;

      if (peakShift) {
        classification = "seasonal-peak-shifted";
      } else if (strengthChange >= 0.2) {
        classification = "seasonal-strength-increasing";
      } else if (strengthChange <= -0.2) {
        classification = "seasonal-strength-decreasing";
      } else {
        classification = "no-clear-seasonal-change";
      }
    }

    confidence = usableProfiles.length >= 4
      ? "moderate"
      : "limited";
  }

  return {
    observations: sales.length,
    yearsAnalysed: numberOfYears,
    usableYears: usableProfiles.length,
    classification,
    confidence,
    peakShift,
    strengthChange,
    yearlyProfiles
  };
}

module.exports = detectSeasonalPatternChange;
