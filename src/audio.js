const VAD = require('node-vad');

const voiceActivityDetection = new VAD(VAD.Mode.VERY_AGGRESSIVE);

function processAudioStream(audioStream, model, voiceActivityDetection) {
  audioStream.on('data', (audio) => {
    voiceActivityDetection
      .processAudio(audio, 16000)
      .then((res) => {
        switch (res) {
          case VAD.Event.ERROR:
            console.log('ERROR');
            break;
          case VAD.Event.NOISE:
            console.log('NOISE');
            break;
          case VAD.Event.SILENCE:
            console.log('SILENCE');
            break;
          case VAD.Event.VOICE:
            console.log('VOICE: ' + processVoice(audio, model));
            break;
        }
      })
      .catch(console.error);
  });
}

function processVoice(audio, model) {
  let modelStream = model.createStream();
  model.feedAudioContent(modelStream, audio.slice(0, audio.length / 2));
  let text = model.finishStream(modelStream);
  return text;
}

module.exports = {
  processAudioStream,
  voiceActivityDetection,
};
