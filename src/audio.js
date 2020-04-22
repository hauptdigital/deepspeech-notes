const createLanguageModel = require('./model');
const VAD = require('node-vad');

const voiceActivityDetection = new VAD(VAD.Mode.VERY_AGGRESSIVE);

const SILENCE_THRESHOLD = 200; // how many milliseconds of inactivity before processing the audio

let model = createLanguageModel();

let modelStream;
let recordedChunks = 0;
let silenceStart = null;
let recordedAudioLength = 0;
let endTimeout = null;
let silenceBuffers = [];

function processAudioStream(data, callback) {
  voiceActivityDetection.processAudio(data, 16000).then((res) => {
    switch (res) {
      case VAD.Event.ERROR:
        console.log('VAD ERROR');
        break;
      case VAD.Event.NOISE:
        console.log('VAD NOISE');
        break;
      case VAD.Event.SILENCE:
        processSilence(data, callback);
        break;
      case VAD.Event.VOICE:
        processVoice(data);
        break;
      default:
        console.log('default', res);
    }
  });

  // timeout after 1s of inactivity
  clearTimeout(endTimeout);
  endTimeout = setTimeout(function () {
    console.log('\n *** timeout *** \n');
    resetAudioStream();
  }, 1000);
}

function endAudioStream(callback) {
  console.log('[end]');
  let results = intermediateDecode();
  if (results) {
    if (callback) {
      callback(results);
    }
  }
}

function resetAudioStream() {
  clearTimeout(endTimeout);
  console.log('\n *** reset *** \n');
  intermediateDecode(); // ignore results
  recordedChunks = 0;
  silenceStart = null;
}

function processSilence(data, callback) {
  if (recordedChunks > 0) {
    // recording is on
    process.stdout.write('-'); // silence detected while recording

    feedAudioContent(data);

    const now = new Date().getTime();
    if (silenceStart === null) {
      silenceStart = now;
    } else if (now - silenceStart > SILENCE_THRESHOLD) {
        silenceStart = null;
        console.log('[end]');
        let results = intermediateDecode();
        if (results) {
          if (callback) {
            callback(results);
          }
        }
      }
    }
  } else {
    process.stdout.write('.'); // silence detected while not recording
    bufferSilence(data);
  }
}

function bufferSilence(data) {
  // VAD has a tendency to cut the first bit of audio data from the start of a recording
  // so keep a buffer of that first bit of audio and in addBufferedSilence() reattach it to the beginning of the recording
  silenceBuffers.push(data);
  if (silenceBuffers.length >= 3) {
    silenceBuffers.shift();
  }
}

function addBufferedSilence(data) {
  let audioBuffer;
  if (silenceBuffers.length) {
    silenceBuffers.push(data);
    let length = 0;
    silenceBuffers.forEach(function (buf) {
      length += buf.length;
    });
    audioBuffer = Buffer.concat(silenceBuffers, length);
    silenceBuffers = [];
  } else {
    audioBuffer = data;
  }
  return audioBuffer;
}

function processVoice(data) {
  silenceStart = null;
  if (recordedChunks === 0) {
    console.log('');
    process.stdout.write('[start]'); // recording started
  } else {
    process.stdout.write('='); // still recording
  }
  recordedChunks++;

  data = addBufferedSilence(data);
  feedAudioContent(data);
}

function createStream() {
  modelStream = model.createStream();
  recordedChunks = 0;
  recordedAudioLength = 0;
}

function finishStream() {
  if (modelStream) {
    let start = new Date();
    let text = model.finishStream(modelStream);
    if (text) {
      if (text === 'i' || text === 'a') {
        // bug in DeepSpeech 0.6 causes silence to be inferred as "i" or "a"
        return;
      }
      console.log('');
      console.log('Recognized Text:', text);
      let recogTime = new Date().getTime() - start.getTime();
      return {
        text,
        recogTime,
        audioLength: Math.round(recordedAudioLength),
      };
    }
  }
  silenceBuffers = [];
  modelStream = null;
}

function intermediateDecode() {
  let results = finishStream();
  createStream();
  return results;
}

function feedAudioContent(chunk) {
  recordedAudioLength += (chunk.length / 2) * (1 / 16000) * 1000;
  model.feedAudioContent(modelStream, chunk.slice(0, chunk.length / 2));
}

module.exports = {
  processAudioStream,
  createStream,
  endAudioStream,
  resetAudioStream,
};
