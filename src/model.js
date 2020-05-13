const DeepSpeech = require('deepspeech');

// Language Model

const modelDirectory = './src/model/';

function createLanguageModel() {
  const modelPath = modelDirectory + 'deepspeech-0.7.1-models.pbmm';
  const scorerPath = modelDirectory + 'deepspeech-0.7.1-models.scorer';

  const model = new DeepSpeech.Model(modelPath);
  model.enableExternalScorer(scorerPath);

  return model;
}

module.exports = createLanguageModel;
