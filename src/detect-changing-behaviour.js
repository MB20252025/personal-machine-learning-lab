
const recogniseBehaviour =
  require("./recognise-behaviour");

function detectChangingBehaviour(sales, windowSize = 6) {
  if (!Array.isArray(sales) || sales.length < windowSize * 2) {
    throw new Error("Not enough data to compare behaviour");
  }

  const periods = [];

  for (
    let start = 0;
    start + windowSize <= sales.length;
    start += windowSize
  ) {
    const periodSales = sales.slice(
      start,
      start + windowSize
    );

    periods.push({
      start: start + 1,
      end: start + windowSize,
      behaviour: recogniseBehaviour(periodSales).behaviour
    });
  }

  const behaviours = [...new Set(
    periods.map(period => period.behaviour)
  )];

  return {
    changed: behaviours.length > 1,
    behaviours,
    periods
  };
}

module.exports = detectChangingBehaviour;
