
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

  const monthlyValues = Array.from(
    { length: 12 },
    () => []
  );

  for (let i = 0; i < sales.length; i++) {
    if (sales[i] !== null) {
      monthlyValues[i % 12].push(sales[i]);
    }
  }

  const allValidSales = sales.filter(value => value !== null);

  const overallAverage = allValidSales.length === 0
    ? 0
    : allValidSales.reduce((sum, value) => sum + value, 0)
      / allValidSales.length;

  const months = monthlyValues.map((values, index) => {
    if (values.length < 2) {
      return {
        month: index + 1,
        observations: values.length,
        averageDemand: null,
        lowestDemand: null,
        highestDemand: null,
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
      averageDemand: Number(average.toFixed(2)),
      lowestDemand: lowest,
      highestDemand: highest,
      variation: variation === null
        ? null
        : Number(variation.toFixed(2)),
      consistency
    };
  });

  return {
    observations: sales.length,
    usableObservations: allValidSales.length,
    overallAverageDemand: Number(overallAverage.toFixed(2)),
    months
  };
}

module.exports = analyseSeasonalConsistency;
