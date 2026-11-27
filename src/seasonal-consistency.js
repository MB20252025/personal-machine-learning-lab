
function analyseSeasonalConsistency(sales) {
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

  const numberOfYears = Math.ceil(sales.length / 12);
  const yearlyProfiles = [];

  for (let year = 0; year < numberOfYears; year++) {
    const yearSales = sales.slice(year * 12, (year + 1) * 12);
    const validSales = yearSales.filter(value => value !== null);

    if (validSales.length < 9) {
      yearlyProfiles.push({
        year: year + 1,
        usableMonths: validSales.length,
        averageDemand: null,
        monthlyIndices: Array(12).fill(null)
      });

      continue;
    }

    const yearlyAverage =
      validSales.reduce((sum, value) => sum + value, 0)
      / validSales.length;

    const monthlyIndices = yearSales.map(value => {
      if (value === null || yearlyAverage === 0) {
        return null;
      }

      return Number((value / yearlyAverage).toFixed(3));
    });

    yearlyProfiles.push({
      year: year + 1,
      usableMonths: validSales.length,
      averageDemand: Number(yearlyAverage.toFixed(2)),
      monthlyIndices
    });
  }

  const months = [];

  for (let month = 0; month < 12; month++) {
    const values = yearlyProfiles
      .map(year => year.monthlyIndices[month])
      .filter(value => value !== null);

    if (values.length < 2) {
      months.push({
        month: month + 1,
        observations: values.length,
        averageSeasonalIndex: null,
        variation: null,
        consistency: "insufficient-data"
      });

      continue;
    }

    const average =
      values.reduce((sum, value) => sum + value, 0)
      / values.length;

    const lowest = Math.min(...values);
    const highest = Math.max(...values);

    const variation = average === 0
      ? (highest === lowest ? 0 : null)
      : ((highest - lowest) / average) * 100;

    let consistency = "variable";

    if (variation !== null && variation <= 10) {
      consistency = "high";
    } else if (variation !== null && variation <= 25) {
      consistency = "moderate";
    }

    months.push({
      month: month + 1,
      observations: values.length,
      averageSeasonalIndex: Number(average.toFixed(3)),
      variation: variation === null
        ? null
        : Number(variation.toFixed(2)),
      consistency
    });
  }

  return {
    observations: sales.length,
    yearlyProfiles,
    months
  };
}

module.exports = analyseSeasonalConsistency;
