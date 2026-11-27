
const analyseCurrentDemand =
  require("./current-demand-behaviour");

const compareDemandLevels =
  require("./compare-demand-levels");

const classifyDemandChange =
  require("./classify-demand-change");

const detectChangingBehaviour =
  require("./detect-changing-behaviour");

function analyseDemandChanges(sales, recentWindowSize = 5) {
  if (!Array.isArray(sales) || sales.length < 8) {
    throw new Error("At least 8 observations are required");
  }

  const current = analyseCurrentDemand(
    sales,
    recentWindowSize
  );

  const levels = compareDemandLevels(
    sales,
    recentWindowSize
  );

  const changeClassification =
    levels.percentageChange === null
      ? "insufficient-baseline"
      : classifyDemandChange(
          levels.percentageChange
        ).classification;

  const behaviourChanges = detectChangingBehaviour(sales);

  return {
    observations: sales.length,

    historicalBehaviour: current.overallBehaviour,

    currentBehaviour: current.currentBehaviour,

    demandLevels: levels,

    demandChange: {
      percentage: levels.percentageChange,
      classification: changeClassification
    },

    behaviourChanged: behaviourChanges.changed,

    behavioursDetected: behaviourChanges.behaviours
  };
}

module.exports = analyseDemandChanges;
