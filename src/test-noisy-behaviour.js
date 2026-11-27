
const extractBehaviourFeatures =
  require("./behaviour-features");

const examples = {
  smallNoisyGrowth: [19, 23, 21, 26, 24, 28, 27, 31],
  largeNoisyGrowth: [190, 230, 210, 260, 240, 280, 270, 310],
  noisyStable: [98, 105, 96, 103, 99, 104, 97, 102]
};

console.log("\nNOISY BEHAVIOUR TEST\n");

for (const [name, sales] of Object.entries(examples)) {
  console.log(name);
  console.log(extractBehaviourFeatures(sales));
  console.log("-------------------------");
}
