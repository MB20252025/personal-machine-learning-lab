
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);

  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

function detectSpikes(sales) {
  if (!Array.isArray(sales) || sales.length < 5) {
    throw new Error("At least 5 observations are required");
  }

  if (!sales.every(value =>
    Number.isFinite(value) && value >= 0
  )) {
    throw new Error("Sales must be valid non-negative numbers");
  }

  const middle = median(sales);

  const zeroRate =
    sales.filter(value => value === 0).length / sales.length;

  const deviations = sales.map(value =>
    Math.abs(value - middle)
  );

  const mad = median(deviations);

  let threshold;

  if (mad === 0) {
    threshold = middle * 1.5;
  } else {
    threshold = middle + (mad * 3);
  }

  // Intermittent demand needs separate treatment.
  // Ordinary customer orders should not automatically
  // be classified as unusual spikes.
  const isIntermittent = zeroRate >= 0.4;

  const spikes = isIntermittent
    ? []
    : sales
        .map((value, index) => ({
          month: index + 1,
          sales: value
        }))
        .filter(item => item.sales > threshold);

  return {
    medianDemand: middle,
    spikeThreshold: Number(threshold.toFixed(2)),
    spikeCount: spikes.length,
    spikeRate: Number((spikes.length / sales.length).toFixed(4)),
    intermittent: isIntermittent,
    spikes
  };
}

module.exports = detectSpikes;
