
const detectSpikes = require("./spike-detection");

const tests = [
  {
    name: "Stable demand",
    sales: Array(24).fill(100),
    expectedSpikes: 0
  },
  {
    name: "Stable demand with occasional spikes",
    sales: [
      100, 100, 100, 500, 100, 100,
      100, 100, 600, 100, 100, 100,
      100, 700, 100, 100, 100, 100,
      500, 100, 100, 100, 100, 600
    ],
    expectedSpikes: 5
  },
  {
    name: "Genuine increasing demand",
    sales: [
      50, 55, 60, 65, 70, 75,
      80, 85, 90, 95, 100, 105,
      110, 115, 120, 125, 130, 135,
      140, 145, 150, 155, 160, 165
    ],
    expectedSpikes: 0
  },
  {
    name: "Regularly volatile demand",
    sales: [
      60, 140, 70, 130, 65, 145,
      75, 135, 55, 150, 80, 125,
      60, 140, 70, 130, 65, 145,
      75, 135, 55, 150, 80, 125
    ],
    expectedSpikes: 0
  }
];

console.log("\nSPIKE DETECTION TEST\n");

let passed = 0;

for (const test of tests) {
  const result = detectSpikes(test.sales);

  const success =
    result.spikeCount === test.expectedSpikes;

  if (success) passed++;

  console.log(
    `${success ? "PASS" : "FAIL"}: ${test.name}`
  );

  console.log("Expected spikes:", test.expectedSpikes);
  console.log("Detected spikes:", result.spikeCount);
  console.log("Spike months:", result.spikes.map(item => item.month));
  console.log("-------------------------");
}

console.log(`\nPassed: ${passed}/${tests.length}`);
