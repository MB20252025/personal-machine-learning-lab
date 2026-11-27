
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

function analyseSeasonalProfile(sales) {
  if (!Array.isArray(sales) || sales.length < 36) {
    throw new Error("At least 36 months of history are required");
  }

  if (!sales.every(value =>
    value === null ||
    (Number.isFinite(value) && value >= 0)
  )) {
    throw new Error(
      "Sales must be non-negative numbers or null for missing data"
    );
  }

  const usableSales = sales.filter(value => value !== null);

  const zeroRate = usableSales.length === 0
    ? 0
    : usableSales.filter(value => value === 0).length
      / usableSales.length;

  const monthlyIndices = Array.from(
    { length: 12 },
    () => []
  );

  const yearlyProfiles = [];

  const numberOfYears = Math.floor(sales.length / 12);

  for (let year = 0; year < numberOfYears; year++) {
    const yearSales = sales.slice(
      year * 12,
      (year + 1) * 12
    );

    const validSales = yearSales.filter(
      value => value !== null
    );

    if (validSales.length < 9) {
      yearlyProfiles.push({
        year: year + 1,
        averageDemand: null,
        usableMonths: validSales.length
      });

      continue;
    }

    const yearlyAverage =
      validSales.reduce((sum, value) => sum + value, 0)
      / validSales.length;

    yearlyProfiles.push({
      year: year + 1,
      averageDemand: Number(yearlyAverage.toFixed(2)),
      usableMonths: validSales.length
    });

    if (yearlyAverage === 0) {
      continue;
    }

    yearSales.forEach((value, monthIndex) => {
      if (value === null) {
        return;
      }

      monthlyIndices[monthIndex].push(
        value / yearlyAverage
      );
    });
  }

  const months = monthlyIndices.map((values, index) => {
    if (values.length === 0) {
      return {
        month: index + 1,
        observations: 0,
        seasonalIndex: null,
        averageDemand: null
      };
    }

    const averageIndex =
      values.reduce((sum, value) => sum + value, 0)
      / values.length;

    return {
      month: index + 1,
      observations: values.length,
      seasonalIndex: Number(averageIndex.toFixed(3)),
      averageDemand: Number((averageIndex * 100).toFixed(2))
    };
  });

  let annualCorrelation = null;
  let halfYearSimilarity = null;
  let annualSeasonalitySupported = false;

  if (numberOfYears >= 3 && zeroRate < 0.4) {
    const completeSales = sales.slice(0, numberOfYears * 12);

    const overallAverage =
      completeSales.reduce((sum, value) =>
        sum + (value === null ? 0 : value), 0
      ) / completeSales.filter(value => value !== null).length;

    const detrended = completeSales.map((value, index) => {
      if (value === null) {
        return null;
      }

      const year = Math.floor(index / 12);

      const yearProfile = yearlyProfiles[year];

      if (!yearProfile || yearProfile.averageDemand === null) {
        return null;
      }

      return overallAverage === 0
        ? value
        : value / yearProfile.averageDemand;
    });

    const first = [];
    const second = [];

    for (let i = 0; i < detrended.length - 12; i++) {
      if (
        detrended[i] !== null &&
        detrended[i + 12] !== null
      ) {
        first.push(detrended[i]);
        second.push(detrended[i + 12]);
      }
    }

    if (first.length >= 18) {
      annualCorrelation = calculateCorrelation(first, second);
    }

    const firstHalf = months.slice(0, 6)
      .map(month => month.seasonalIndex);

    const secondHalf = months.slice(6, 12)
      .map(month => month.seasonalIndex);

    if (
      firstHalf.every(value => value !== null) &&
      secondHalf.every(value => value !== null)
    ) {
      const difference =
        firstHalf.reduce((sum, value, index) =>
          sum + Math.abs(value - secondHalf[index]), 0
        ) / 6;

      const magnitude =
        months.reduce((sum, month) =>
          sum + Math.abs(month.seasonalIndex), 0
        ) / 12;

      halfYearSimilarity = magnitude === 0
        ? 0
        : 1 - Math.min(1, difference / magnitude);
    }

    annualSeasonalitySupported =
      annualCorrelation !== null &&
      annualCorrelation >= 0.7 &&
      halfYearSimilarity !== null &&
      halfYearSimilarity < 0.9;
  }

  let classification = "insufficient-evidence";

  if (zeroRate >= 0.4) {
    classification = "intermittent";
  } else if (annualSeasonalitySupported) {
    classification = "annual-seasonality-supported";
  } else if (
    annualCorrelation !== null &&
    annualCorrelation >= 0.7 &&
    halfYearSimilarity !== null &&
    halfYearSimilarity >= 0.9
  ) {
    classification = "possible-shorter-cycle";
  } else if (annualCorrelation !== null) {
    classification = "no-clear-annual-seasonality";
  }

  return {
    observations: sales.length,
    usableObservations: usableSales.length,
    zeroRate: Number(zeroRate.toFixed(4)),
    annualCorrelation: annualCorrelation === null
      ? null
      : Number(annualCorrelation.toFixed(4)),
    halfYearSimilarity: halfYearSimilarity === null
      ? null
      : Number(halfYearSimilarity.toFixed(4)),
    annualSeasonalitySupported,
    classification,
    yearlyProfiles,
    months
  };
}

module.exports = analyseSeasonalProfile;
