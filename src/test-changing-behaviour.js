
const recogniseBehaviour =
  require("./recognise-behaviour");

const sales = [
  100, 102, 98, 101, 99, 100,
  110, 120, 130, 140, 150, 160,
  155, 145, 135, 125, 115, 105, 95, 85,
  80, 82, 78, 81
];

console.log("\nCHANGING BEHAVIOUR TEST\n");

console.log(
  "Full history:",
  recogniseBehaviour(sales).behaviour
);

console.log(
  "First period:",
  recogniseBehaviour(sales.slice(0, 6)).behaviour
);

console.log(
  "Growth period:",
  recogniseBehaviour(sales.slice(6, 12)).behaviour
);

console.log(
  "Declining period:",
  recogniseBehaviour(sales.slice(12, 20)).behaviour
);

console.log(
  "Final period:",
  recogniseBehaviour(sales.slice(20)).behaviour
);
