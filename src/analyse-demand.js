
const extractBehaviourFeatures =
  require("./behaviour-features");

const detectSpikes =
  require("./spike-detection");

function analyseDemand(sales) {
  const features = extractBehaviourFeatures(sales);
  const spikeResults = detectSpikes(sales);

  const patterns = [];

  const isIntermittent = features.zeroRate >= 0.4;

  if (isIntermittent) {
    patterns.push("intermittent");
  } else {
    // Identify the underlying demand direction.
    if (features.relativeTrend > 0.02) {
      patterns.push("increasing");
    } else if (features.relativeTrend < -0.02) {
      patterns.push("declining");
    } else {
      patterns.push("stable");
    }

    // Seasonality can exist alongside an upward
    // or downward trend, so do not exclude it.
    if (
      features.seasonalCorrelation !== null &&
      features.seasonalCorrelation >= 0.7
    ) {
      patterns.push("possible-seasonality");
    }

    // Identify unusually large individual orders.
    if (spikeResults.spikeCount > 0) {
      patterns.push("spiky");
    }

    // Identify irregular variation.
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
