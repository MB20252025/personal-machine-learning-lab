
const extractBehaviourFeatures =
  require("./behaviour-features");

const detectSpikes =
  require("./spike-detection");

function analyseDemand(sales) {
  const features = extractBehaviourFeatures(sales);
  const spikeResults = detectSpikes(sales);

  const patterns = [];

  const isIntermittent = features.zeroRate >= 0.4;

  // Intermittent demand takes priority because
  // zero-demand months are normal for this behaviour.
  if (isIntermittent) {
    patterns.push("intermittent");
  } else {
    // Underlying direction
    if (features.relativeTrend > 0.02) {
      patterns.push("increasing");
    } else if (features.relativeTrend < -0.02) {
      patterns.push("declining");
    } else {
      patterns.push("stable");
    }

    // Seasonality is only considered when there
    // is enough evidence of a repeating pattern.
    if (
      features.seasonalCorrelation !== null &&
      features.seasonalCorrelation >= 0.7 &&
      Math.abs(features.relativeTrend) < 0.02
    ) {
      patterns.push("possible-seasonality");
    }

    // Individual unusually large orders
    if (spikeResults.spikeCount > 0) {
      patterns.push("spiky");
    }

    // Irregular variation, excluding identified spikes
    if (
      features.relativeVolatility > 0.15 &&
      spikeResults.spikeCount === 0 &&
      !patterns.includes("possible-seasonality")
    ) {
      patterns.push("volatile");
    }
  }

  return {
    patterns,
    features,
    spikes: spikeResults
  };
}

module.exports = analyseDemand;
