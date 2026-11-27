
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

  const monthlyIndices = Array.from(
    { length: 12 },
    () => []
  );

  const yearlyProfiles = [];

  const numberOfYears = Math.ceil(sales.length / 12);

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
    if (values.length < 2) {
      return {
        month: index + 1,
        observations: values.length,
        averageSeasonalIndex: null,
        lowestSeasonalIndex: null,
        highestSeasonalIndex: null,
        variation: null,
        consistency: "insufficient-data"
      };
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

    return {
      month: index + 1,
      observations: values.length,
      averageSeasonalIndex: Number(average.toFixed(3)),
      lowestSeasonalIndex: Number(lowest.toFixed(3)),
      highestSeasonalIndex: Number(highest.toFixed(3)),
      variation: variation === null
        ? null
        : Number(variation.toFixed(2)),
      consistency
    };
  });

  const allValidSales = sales.filter(
    value => value !== null
  );

  const overallAverageDemand = allValidSales.length === 0
    ? 0
    : allValidSales.reduce((sum, value) => sum + value, 0)
      / allValidSales.length;

  return {
    observations: sales.length,
    usableObservations: allValidSales.length,
    overallAverageDemand: Number(overallAverageDemand.toFixed(2)),
    yearlyProfiles,
    months
  };
}

module.exports = analyseSeasonalConsistency;
