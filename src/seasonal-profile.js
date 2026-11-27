
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

  const monthlyData = Array.from(
    { length: 12 },
    () => []
  );

  const validSales = sales.filter(value => value !== null);

  if (validSales.length === 0) {
    throw new Error("No usable sales data available");
  }

  for (let i = 0; i < sales.length; i++) {
    if (sales[i] !== null) {
      const monthIndex = i % 12;
      monthlyData[monthIndex].push(sales[i]);
    }
  }

  const overallAverage =
    validSales.reduce((sum, value) => sum + value, 0)
    / validSales.length;

  const months = monthlyData.map((values, index) => {
    if (values.length === 0) {
      return {
        month: index + 1,
        observations: 0,
        averageDemand: null,
        seasonalIndex: null
      };
    }

    const averageDemand =
      values.reduce((sum, value) => sum + value, 0)
      / values.length;

    const seasonalIndex = overallAverage === 0
      ? null
      : averageDemand / overallAverage;

    return {
      month: index + 1,
      observations: values.length,
      averageDemand: Number(averageDemand.toFixed(2)),
      seasonalIndex: seasonalIndex === null
        ? null
        : Number(seasonalIndex.toFixed(3))
    };
  });

  return {
    observations: sales.length,
    usableObservations: validSales.length,
    overallAverageDemand: Number(overallAverage.toFixed(2)),
    monthsWithData: months.filter(
      month => month.observations > 0
    ).length,
    months
  };
}

module.exports = analyseSeasonalProfile;
