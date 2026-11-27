
function trainModel(examples, options = {}) {
  if (!Array.isArray(examples) || examples.length < 2) {
    throw new Error("At least two training examples are required");
  }

  const learningRate = options.learningRate ?? 0.01;
  const iterations = options.iterations ?? 10000;

  for (const example of examples) {
    if (
      !Number.isFinite(example.month) ||
      !Number.isFinite(example.sales)
    ) {
      throw new Error("Training data contains invalid values");
    }
  }

  let weight = 0;
  let bias = 0;

  for (let i = 0; i < iterations; i++) {
    let weightError = 0;
    let biasError = 0;

    for (const example of examples) {
      const prediction = weight * example.month + bias;
      const error = prediction - example.sales;

      weightError += error * example.month;
      biasError += error;
    }

    weightError /= examples.length;
    biasError /= examples.length;

    weight -= learningRate * weightError;
    bias -= learningRate * biasError;
  }

  return {
    weight,
    bias,
    trainedOn: examples.length,
    iterations
  };
}

module.exports = trainModel;
