
const analyseCurrentDemand =
  require("./current-demand-behaviour");

const compareDemandPeriods =
  require("./compare-demand-periods");

const classifyDemandChange =
  require("./classify-demand-change");

const detectChangingBehaviour =
  require("./detect-changing-behaviour");

const detectSeasonalChange =
  require("./detect-seasonal-change");

function analyseDemandPeriodChanges(sales, periodSize = 5) {
  if (!Array.isArray(sales)) {
    throw new Error("Sales must be an array");
  }

  if (
    !Number.isInteger(periodSize) ||
    periodSize < 5 ||
    periodSize * 2 > sales.length
  ) {
    throw new Error("Invalid period size or not enough observations");
  }

  const current = analyseCurrentDemand(sales, periodSize);

  const comparison =
    compareDemandPeriods(sales, periodSize);

  const percentageChange = comparison.percentageChange;

  const changeClassification = percentageChange === null
    ? "insufficient-baseline"
    : classifyDemandChange(percentageChange).classification;

  const behaviourChanges =
    detectChangingBehaviour(sales);

  let seasonalComparison;

  if (sales.length >= 36) {
    const seasonalWindowSize = Math.min(periodSize, 12);

    seasonalComparison = {
      available: true,
      ...detectSeasonalChange(sales, seasonalWindowSize)
    };
  } else {
    seasonalComparison = {
      available: false,
      classification: "insufficient-history",
      averageChange: null,
      comparisons: []
    };
  }

  return {
    observations: sales.length,

    historicalBehaviour: current.overallBehaviour,

    currentBehaviour: current.currentBehaviour,

    previousPeriod: comparison.previousPeriod,

    recentPeriod: comparison.recentPeriod,

    demandChange: {
      percentage: percentageChange,
      classification: changeClassification
    },

    behaviourChanged: behaviourChanges.changed,

    behavioursDetected: behaviourChanges.behaviours,

    seasonalComparison
  };
}

module.exports = analyseDemandPeriodChanges;
