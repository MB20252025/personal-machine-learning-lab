
const extractBehaviourFeatures =
  require("./behaviour-features");

function recogniseBehaviour(sales) {
  const features = extractBehaviourFeatures(sales);

  let behaviour;

  // Check intermittent demand first.
  if (features.zeroRate >= 0.4) {
    behaviour = "intermittent";
  }

  // Check volatility before trend.
  else if (features.relativeVolatility > 0.15) {
    behaviour = "volatile";
  }

  // Then examine demand direction.
  else if (features.relativeTrend > 0.02) {
    behaviour = "increasing";
  }

  else if (features.relativeTrend < -0.02) {
    behaviour = "declining";
  }

  else {
    behaviour = "stable";
  }

  return {
    behaviour,
    features
  };
}

module.exports = recogniseBehaviour;
