
function classifyDemandChange(percentageChange) {
  if (
    !Number.isFinite(percentageChange)
  ) {
    throw new Error("A valid percentage change is required");
  }

  let classification;

  if (percentageChange >= 30) {
    classification = "significant-increase";
  } else if (percentageChange >= 10) {
    classification = "moderate-increase";
  } else if (percentageChange <= -30) {
    classification = "significant-decrease";
  } else if (percentageChange <= -10) {
    classification = "moderate-decrease";
  } else {
    classification = "little-change";
  }

  return {
    percentageChange,
    classification
  };
}

module.exports = classifyDemandChange;
