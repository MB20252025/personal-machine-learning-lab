
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

  return {
    observations: sales.length,
    usableObservations: sales.filter(
      value => value !== null
    ).length,
    yearlyProfiles,
    months
  };
}

module.exports = analyseSeasonalProfile;
