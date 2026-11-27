
const automaticTraining = require("./automatic-training");

const actual = [100, 110, 120, 130];

const currentModel = {
  weight: 10,
  bias: 90
};

const newModel = {
  weight: 9.8,
  bias: 92
};

const currentPredictions = [120, 130, 140, 150];
const newPredictions = [102, 112, 118, 132];

const result = automaticTraining({
  actual,
  currentPredictions,
  newPredictions,
  currentModel,
  newModel
});

console.log("AUTOMATIC TRAINING TEST");
console.log(result);
