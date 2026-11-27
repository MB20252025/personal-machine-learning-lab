
function createLearningRecord(model, metrics, version) {
  return {
    version,
    trainedAt: new Date().toISOString(),

    parameters: {
      weight: model.weight,
      bias: model.bias
    },

    performance: {
      mae: metrics.mae,
      rmse: metrics.rmse
    }
  };
}

function addLearningRecord(history, record) {
  return [...history, record];
}

function getLatestModel(history) {
  if (history.length === 0) {
    return null;
  }

  return history[history.length - 1];
}

module.exports = {
  createLearningRecord,
  addLearningRecord,
  getLatestModel
};
