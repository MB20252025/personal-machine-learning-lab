
const analyseCurrentDemand =
  require("./current-demand-behaviour");

const compareDemandPeriods =
  require("./compare-demand-periods");

const classifyDemandChange =
  require("./classify-demand-change");

const detectChangingBehaviour =
  require("./detect-changing-behaviour");

function analyseDemandPeriodChanges(sales, periodSize = 5) {
  if (!Array.isArray(sales) || sales.length < periodSize * 2) {
    throw new Error("Not enough observations for two periods");
  }

  if (
    !Number.isInteger(periodSize) ||
    periodSize < 5 ||
    periodSize * 2 > sales.length
  ) {
    throw new Error("Invalid period size");
  }

  const current = analyseCurrentDemand(
    sales,
    periodSize
  );

  const comparison = compareDemandPeriods(
    sales,
    periodSize
  );

  const percentageChange = comparison.percentageChange;

  const changeClassification = percentageChange === null
    ? "insufficient-baseline"
    : classifyDemandChange(percentageChange).classification;

  const behaviourChanges = detectChangingBehaviour(sales);

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

    behavioursDetected: behaviourChanges.behaviours
  };
}

module.exports = analyseDemandPeriodChanges;
