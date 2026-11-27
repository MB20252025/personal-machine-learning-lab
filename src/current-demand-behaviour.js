
const analyseDemand = require("./analyse-demand");

function analyseCurrentDemand(sales, recentWindowSize = 5) {
  if (!Array.isArray(sales) || sales.length < 5) {
    throw new Error("At least 5 observations are required");
  }

  if (
    !Number.isInteger(recentWindowSize) ||
    recentWindowSize < 5 ||
    recentWindowSize > sales.length
  ) {
    throw new Error("Invalid recent window size");
  }

  const overall = analyseDemand(sales);

  const recentSales = sales.slice(-recentWindowSize);

  const recent = analyseDemand(recentSales);

  const startMonth =
    sales.length - recentWindowSize + 1;

  return {
    overallBehaviour: overall.patterns,

    currentBehaviour: recent.patterns,

    recentPeriod: {
      startMonth,
      endMonth: sales.length,
      observations: recentWindowSize
    },

    features: recent.features,

    spikes: recent.spikes
  };
}

module.exports = analyseCurrentDemand;
