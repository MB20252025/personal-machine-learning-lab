
const detectSeasonalPatternChange =
  require("./seasonal-pattern-change");

const seasonalYear = [
  50, 60, 80, 100, 130, 160,
  180, 170, 140, 110, 80, 60
];

const strongerYear = [
  30, 40, 60, 90, 140, 190,
  230, 210, 160, 110, 70, 40
];

const weakerYear = [
  90, 95, 98, 100, 102, 105,
  110, 108, 105, 100, 97, 90
];

const shiftedYear = [
  100, 90, 80, 70, 60, 80,
  120, 110, 90, 100, 140, 180
];

const stableYear = Array(12).fill(100);

const scenarios = [
  {
    name: "STABLE SEASONAL PATTERN",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...seasonalYear
    ]
  },
  {
    name: "INCREASING SEASONAL STRENGTH",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...strongerYear
    ]
  },
  {
    name: "DECREASING SEASONAL STRENGTH",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...weakerYear
    ]
  },
  {
    name: "SHIFTING SEASONAL PEAK",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...shiftedYear
    ]
  },
  {
    name: "MISSING MONTHS",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...shiftedYear
    ].map((value, index) =>
      [26, 30].includes(index) ? null : value
    )
  },
  {
    name: "EMERGING SEASONALITY",
    sales: [
      ...stableYear,
      ...stableYear,
      ...seasonalYear
    ]
  },
  {
    name: "DISAPPEARING SEASONALITY",
    sales: [
      ...seasonalYear,
      ...seasonalYear,
      ...stableYear
    ]
  }
];

scenarios.forEach(scenario => {
  console.log("\n==============================");
  console.log(scenario.name);
  console.log("==============================");

  const result =
    detectSeasonalPatternChange(scenario.sales);

  console.log("Classification:", result.classification);
  console.log("Confidence:", result.confidence);
  console.log("Usable years:", result.usableYears);
  console.log("Peak shifted:", result.peakShift);
  console.log("Strength change:", result.strengthChange);

  console.log("\nYearly peak months:");

  result.yearlyProfiles.forEach(profile => {
    console.log(
      "Year:", profile.year,
      "| Peak month:", profile.peakMonths.join(", ") || "Unknown",
      "| Peak index:", profile.peakIndex
    );
  });
});

console.log("\nALL SEVEN SEASONAL PATTERN TESTS COMPLETE");
