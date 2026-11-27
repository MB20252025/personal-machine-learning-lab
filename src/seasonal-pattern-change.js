
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

  return {
    averageDemand: Number(average.toFixed(2)),
    indices,
    peakIndex: Number(peak.toFixed(3)),
    peakMonths
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

    const firstPeak = first.peakMonths[0];
    const latestPeak = latest.peakMonths[0];

    peakShift = firstPeak !== latestPeak;

    strengthChange = Number(
      (latest.peakIndex - first.peakIndex).toFixed(3)
    );

    const firstRange = Math.max(
      ...first.indices.filter(value => value !== null)
    ) - Math.min(
      ...first.indices.filter(value => value !== null)
    );

    const latestRange = Math.max(
      ...latest.indices.filter(value => value !== null)
    ) - Math.min(
      ...latest.indices.filter(value => value !== null)
    );

    if (peakShift) {
      classification = "seasonal-peak-shifted";
    } else if (strengthChange >= 0.2) {
      classification = "seasonal-strength-increasing";
    } else if (strengthChange <= -0.2) {
      classification = "seasonal-strength-decreasing";
    } else if (firstRange <= 0.2 && latestRange >= 0.4) {
      classification = "seasonality-emerging";
    } else if (firstRange >= 0.4 && latestRange <= 0.2) {
      classification = "seasonality-disappearing";
    } else {
      classification = "no-clear-seasonal-change";
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
