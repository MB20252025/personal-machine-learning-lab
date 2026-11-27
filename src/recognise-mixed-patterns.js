
const extractBehaviourFeatures =
  require("./behaviour-features");

function recogniseMixedPatterns(sales) {
  const features = extractBehaviourFeatures(sales);

  const patterns = [];

  // Direction
  if (features.relativeTrend > 0.02) {
    patterns.push("increasing");
  } else if (features.relativeTrend < -0.02) {
    patterns.push("declining");
  } else {
    patterns.push("stable");
  }

  // Intermittent demand
  if (features.zeroRate >= 0.4) {
    patterns.push("intermittent");
  }

  // Seasonal signal (provisional)
  if (
    features.seasonalCorrelation !== null &&
    features.seasonalCorrelation >= 0.7
  ) {
    patterns.push("possible-seasonality");
  }

  // Volatility
  if (features.relativeVolatility > 0.15) {
    patterns.push("volatile");
  }

  return {
    patterns,
    features
  };
}

module.exports = recogniseMixedPatterns;
