
const analyseDemand = require("./analyse-demand");

const detectChangingBehaviour =
  require("./detect-changing-behaviour");

function analyseDemandHistory(
  sales,
  recentWindowSize = 6,
  changeWindowSize = 4,
  stepSize = 2
) {
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

  // Analyse the complete history.
  const overall = analyseDemand(sales);

  // Analyse only the most recent observations.
  const recentSales = sales.slice(-recentWindowSize);
  const recent = analyseDemand(recentSales);

  // Work out which months the recent analysis covers.
  const recentStartMonth =
    sales.length - recentWindowSize + 1;

  const recentEndMonth = sales.length;

  // Check whether behaviour has changed over time.
  let change = {
    changed: false,
    behaviours: [],
    periods: [],
    available: false
  };

  if (sales.length >= changeWindowSize * 2) {
    const result = detectChangingBehaviour(
      sales,
      changeWindowSize,
      stepSize
    );

    change = {
      ...result,
      available: true
    };
  }

  // Compare overall and recent behaviour.
  const overallDirection = overall.patterns.find(pattern =>
    ["increasing", "declining", "stable"].includes(pattern)
  );

  const recentDirection = recent.patterns.find(pattern =>
    ["increasing", "declining", "stable"].includes(pattern)
  );

  const recentDiffers =
    overallDirection !== recentDirection;

  return {
    observations: sales.length,

    overall,

    recent: {
      startMonth: recentStartMonth,
      endMonth: recentEndMonth,
      observations: recentWindowSize,
      ...recent
    },

    change,

    recentDiffers
  };
}

module.exports = analyseDemandHistory;
