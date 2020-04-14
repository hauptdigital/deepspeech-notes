const DeepSpeech = require('deepspeech');

function createModel(modelDirectory, modelOptions) {
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

exports.createModel = createModel;
