
const extractBehaviourFeatures =
  require("./behaviour-features");

const examples = {
  smallGrowth: [20, 21, 22, 23, 24, 25],
  largeGrowth: [200, 210, 220, 230, 240, 250],
  smallDecline: [25, 24, 23, 22, 21, 20],
  largeDecline: [250, 240, 230, 220, 210, 200],
  stable: [100, 101, 99, 100, 101, 99]
};

console.log("\nBEHAVIOUR RECOGNITION TEST\n");

for (const [name, sales] of Object.entries(examples)) {
  const features = extractBehaviourFeatures(sales);

  console.log(name);
  console.log(features);
  console.log("-------------------------");
}
