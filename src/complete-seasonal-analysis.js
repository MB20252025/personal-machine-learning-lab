
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const detectSeasonalChange =
  require("./detect-seasonal-change");

function completeSeasonalAnalysis(sales) {
  if (!Array.isArray(sales) || sales.length < 36) {
    throw new Error("At least 36 months of history are required");
  }

  const profile = analyseSeasonalProfile(sales);

  const consistency =
    analyseSeasonalConsistency(sales);

  const recentChange =
    detectSeasonalChange(sales);

  return {
    observations: sales.length,

    seasonalProfile: {
      overallAverageDemand: profile.overallAverageDemand,
      months: profile.months
    },

    seasonalConsistency: {
      yearlyProfiles: consistency.yearlyProfiles,
      months: consistency.months
    },

    recentSeasonalChange: {
      classification: recentChange.classification,
      confidence: recentChange.confidence,
      averageChange: recentChange.averageChange,
      largestIncrease: recentChange.largestIncrease,
      largestDecrease: recentChange.largestDecrease,
      validComparisons: recentChange.validComparisons,
      skippedMissingData: recentChange.skippedMissingData,
      skippedZeroBaseline: recentChange.skippedZeroBaseline
    }
  };
}

module.exports = completeSeasonalAnalysis;
