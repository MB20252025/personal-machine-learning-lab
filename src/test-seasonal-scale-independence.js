
const analyseSeasonalProfile =
  require("./seasonal-profile");

const analyseSeasonalConsistency =
  require("./seasonal-consistency");

const baseDemand = [
  5, 6, 8, 10, 13, 16,
  18, 17, 14, 11, 8, 6
];

function createThreeYears(multiplier) {
  return [
    ...baseDemand.map(value => value * multiplier),
    ...baseDemand.map(value => value * multiplier),
    ...baseDemand.map(value => value * multiplier)
  ];
}

const businesses = [
  {
    name: "SMALL BUSINESS",
    sales: createThreeYears(1)
  },
  {
    name: "MEDIUM BUSINESS",
    sales: createThreeYears(10)
  },
  {
    name: "LARGE BUSINESS",
    sales: createThreeYears(100)
  }
];

businesses.forEach(business => {
  console.log("\n==============================");
  console.log(business.name);
  console.log("==============================");

  const profile =
    analyseSeasonalProfile(business.sales);

  const consistency =
    analyseSeasonalConsistency(business.sales);

  console.log("\nSeasonal indices:");

  profile.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Index:", month.seasonalIndex
    );
  });

  console.log("\nConsistency:");

  consistency.months.forEach(month => {
    console.log(
      "Month:", month.month,
      "| Index:", month.averageSeasonalIndex,
      "| Consistency:", month.consistency
    );
  });
});

console.log("\nALL SCALE-INDEPENDENCE TESTS COMPLETE");
