
const detectChange = require("./change-detection");

const actual = [145, 135, 125, 115];

const predicted = [180.79, 190.57, 200.36, 210.14];

const result = detectChange(actual, predicted);

console.log("CHANGE DETECTION RESULTS");
console.log("------------------------");
console.log("Change detected:", result.changed);
console.log("Direction:", result.direction);
console.log("Recent errors:", result.recentErrors);
