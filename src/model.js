const DeepSpeech = require('deepspeech');

// Language Model

const modelDirectory = './src/model';

const modelOptions = {
  // The beam width used by the decoder. A larger beam width generates better results at the cost of decoding time.
  BEAM_WIDTH: 1024,
  // The alpha hyperparameter of the CTC decoder. Language Model weight.
  LM_ALPHA: 0.75,
  // The beta hyperparameter of the CTC decoder. Word insertion weight.
  LM_BETA: 1.85,
};

function createModel() {
  const modelPath = modelDirectory + '/output_graph.pbmm';
  const modelBinaryPath = modelDirectory + '/lm.binary';
  const triePath = modelDirectory + '/trie';
  const model = new DeepSpeech.Model(modelPath, modelOptions.BEAM_WIDTH);

  // Enable decoding using beam scoring with a KenLM language model.
  model.enableDecoderWithLM(
    modelBinaryPath,
    triePath,
    modelOptions.LM_ALPHA,
    modelOptions.LM_BETA
  );

  return model;
}

module.exports = createModel;
