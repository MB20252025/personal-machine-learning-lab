
const detectChangingBehaviour =
  require("./detect-changing-behaviour");

const sales = [
  100, 102, 98, 101, 99, 100,
  110, 120, 130, 140, 150, 160,
  155, 145, 135, 125, 115, 105, 95, 85,
  80, 82, 78, 81
];

console.log("\nCHANGING BEHAVIOUR DETECTION\n");

const result = detectChangingBehaviour(sales);

console.log("Behaviour changed:", result.changed);

console.log("\nDetected behaviours:");

for (const period of result.periods) {
  console.log(
    `Months ${period.start}-${period.end}: ${period.behaviour}`
  );
}

console.log("\nDifferent behaviours:", result.behaviours);
