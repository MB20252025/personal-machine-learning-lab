
const {
  createLearningRecord,
  addLearningRecord
} = require("./learning-history");

const selectBestModel = require("./model-selector");

function updateModelHistory(history, model, metrics) {
  const version = history.length + 1;

  const record = createLearningRecord(
    model,
    metrics,
    version
  );

  const updatedHistory = addLearningRecord(
    history,
    record
  );

  const selection = selectBestModel(updatedHistory);

  return {
    history: updatedHistory,
    bestModel: selection.model,
    reason: selection.reason
  };
}

module.exports = updateModelHistory;
