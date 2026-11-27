
const extractBehaviourFeatures =
  require("./behaviour-features");

const detectSpikes =
  require("./spike-detection");

function analyseDemand(sales) {
  const features = extractBehaviourFeatures(sales);
  const spikeResults = detectSpikes(sales);

  const patterns = [];

  // Underlying direction
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

  // Possible seasonality
  if (
    features.seasonalCorrelation !== null &&
    features.seasonalCorrelation >= 0.7
  ) {
    patterns.push("possible-seasonality");
  }

  // Unusual individual orders
  if (spikeResults.spikeCount > 0) {
    patterns.push("spiky");
  }

  // Irregular variation
  if (
    features.relativeVolatility > 0.15 &&
    spikeResults.spikeCount === 0
  ) {
    patterns.push("volatile");
  }

  return {
    patterns,
    features,
    spikes: spikeResults
  };
}

module.exports = analyseDemand;
