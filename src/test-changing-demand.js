
const analyseDemand = require("./analyse-demand");
const detectChangingBehaviour =
  require("./detect-changing-behaviour");

const sales = [
  // Months 1–6: Stable
  100, 102, 98, 101, 99, 100,

  // Months 7–12: Increasing
  110, 120, 130, 140, 150, 160,

  // Months 13–20: Declining
  155, 145, 135, 125, 115, 105, 95, 85,

  // Months 21–24: Stable at a lower level
  80, 82, 78, 81
];

console.log("\nCHANGING DEMAND TEST\n");

console.log("Overall demand analysis:");

const overall = analyseDemand(sales);

console.log("Patterns:", overall.patterns);

console.log("\nChanging behaviour analysis:");

const changing = detectChangingBehaviour(sales, 4, 2);

console.log("Has demand changed?", changing.changed);

console.log("Behaviours found:", changing.behaviours);

console.log("\nIndividual periods:");

for (const period of changing.periods) {
  console.log(
    `Months ${period.start}-${period.end}: ${period.behaviour}`
  );
}
