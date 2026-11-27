
const classifyDemandChange =
  require("./classify-demand-change");

const tests = [
  50,
  30,
  20,
  10,
  5,
  0,
  -5,
  -10,
  -20,
  -30,
  -50
];

console.log("\nDEMAND CHANGE CLASSIFICATION\n");

for (const change of tests) {
  const result = classifyDemandChange(change);

  console.log(
    change + "%",
    "=>",
    result.classification
  );
}
