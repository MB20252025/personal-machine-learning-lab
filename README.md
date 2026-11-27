
# Personal Machine Learning Lab

An independent project to learn how machine learning works by building and testing our own models.

## Project goals

- Build machine learning models from scratch.
- Train models using example data.
- Test predictions against real results.
- Experiment with different learning methods.
- Understand how models learn and improve.
- Keep training data separate from learned models.

## Current prototype

Our first model uses linear regression.

It learns the relationship between month and sales using training examples.

### Project structure

- `data/` - Training examples.
- `models/` - Saved trained models.
- `src/train.js` - Training engine.
- `src/predict.js` - Prediction engine.

## Important principle

The machine can update its learned mathematical parameters, but it must never rewrite its own source code automatically.
