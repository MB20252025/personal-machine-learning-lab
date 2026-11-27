const detectSpikes = require("./spike-detection");

const tests = [
  {
    name: "Stable demand with one unusually large order",
    sales: [100, 100, 100, 100, 300, 100, 100, 100]
  },
  {
    name: "Intermittent demand with many zero months",
    sales: [0, 0, 0, 50, 0, 0, 80, 0, 0, 0, 60, 0]
  },
  {
    name: "Regular seasonal demand",
    sales: [50, 60, 80, 100, 130, 150, 170, 160, 130, 100, 80, 60]
  },
  {
    name: "Mostly identical demand",
    sales: [100, 100, 100, 100, 100, 120, 100, 100]
  }
];

for (const test of tests) {
  console.log("\n" + test.name);
  console.log("------------------------------");

  const result = detectSpikes(test.sales);

  console.log("Median demand:", result.medianDemand);
  console.log("Spike threshold:", result.spikeThreshold);
  console.log("Spike count:", result.spikeCount);
  console.log("Spikes:", result.spikes);
}
