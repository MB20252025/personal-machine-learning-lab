
const recogniseBehaviour =
  require("./recognise-behaviour");

function calculateBehaviourConfidence(sales) {
  const result = recogniseBehaviour(sales);
  const features = result.features;

  let confidence = 0;

  switch (result.behaviour) {
    case "increasing":
    case "declining":
      confidence = Math.min(
        100,
        Math.abs(features.relativeTrend) / 0.05 * 100
      );
      break;

    case "seasonal":
      confidence = Math.max(
        0,
        Math.min(100,
          features.seasonalCorrelation * 100
        )
      );
      break;

    case "intermittent":
      confidence = Math.min(
        100,
        features.zeroRate / 0.7 * 100
      );
      break;

    case "volatile":
      confidence = Math.min(
        100,
        features.relativeVolatility / 0.3 * 100
      );
      break;

    case "stable":
      confidence = Math.max(
        0,
        100 -
        Math.abs(features.relativeTrend) / 0.02 * 50 -
        features.relativeVolatility / 0.15 * 50
      );
      break;
  }

  // Short histories provide less evidence.
  const dataFactor = Math.min(
    1,
    sales.length / 12
  );

  confidence *= dataFactor;

  confidence = Math.round(
    Math.max(0, Math.min(100, confidence))
  );

  let level;

  if (confidence >= 75) {
    level = "high";
  } else if (confidence >= 45) {
    level = "medium";
  } else {
    level = "low";
  }

  return {
    behaviour: result.behaviour,
    confidence,
    level,
    observations: sales.length
  };
}

module.exports = calculateBehaviourConfidence;
