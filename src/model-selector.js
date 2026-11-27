
function selectBestModel(history) {
  if (!history || history.length === 0) {
    return {
      model: null,
      reason: "No models available"
    };
  }

  const validModels = history.filter(record =>
    record.parameters &&
    record.performance &&
    Number.isFinite(record.performance.mae)
  );

  if (validModels.length === 0) {
    return {
      model: null,
      reason: "No models have valid performance records"
    };
  }

  const bestModel = validModels.reduce((best, current) =>
    current.performance.mae < best.performance.mae
      ? current
      : best
  );

  return {
    model: bestModel,
    reason: "Selected using lowest recorded MAE"
  };
}

module.exports = selectBestModel;
