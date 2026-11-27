
const extractBehaviourFeatures =
  require("./behaviour-features");

function recogniseBehaviour(sales) {
  const features = extractBehaviourFeatures(sales);

  let behaviour;

  if (features.zeroRate >= 0.4) {
    behaviour = "intermittent";
  } else if (features.relativeTrend > 0.02) {
    behaviour = "increasing";
  } else if (features.relativeTrend < -0.02) {
    behaviour = "declining";
  } else if (features.relativeVolatility > 0.15) {
    behaviour = "volatile";
  } else {
    behaviour = "stable";
  }

  return {
    behaviour,
    features
  };
}

module.exports = recogniseBehaviour;
