
const extractBehaviourFeatures =
  require("./behaviour-features");

const seasonalSales = [
  50, 60, 80, 100, 120, 140,
  160, 150, 130, 110, 80, 60,
  50, 60, 80, 100, 120, 140,
  160, 150, 130, 110, 80, 60
];

const result = extractBehaviourFeatures(seasonalSales);

console.log("\nSEASONAL RECOGNITION TEST\n");
console.log(result);

console.log(
  "\nSeasonal signal:",
  result.seasonalCorrelation
);
