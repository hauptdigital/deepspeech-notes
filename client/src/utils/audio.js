import io from 'socket.io-client';
const port = process.env.SOCKET_PORT || 4000;

function getSocketURL() {
  switch (process.env.NODE_ENV) {
    case 'development':
      return 'localhost:' + port;
    case 'production':
      return undefined;
  }
}

async function startRecording() {
  // Connect to socket
  const socket = io(getSocketURL());

  ///*** Setup audio context and creation of mono audio buffer ***///
  // Get AudioContext
  const audioContext = await createAudioContext();

  // Get mono audio buffer from audio context
  const audioBufferMono = new AudioWorkletNode(audioContext, 'voice-processor');

  // Connect mono audio buffer to audioContext.destination
  audioBufferMono.connect(audioContext.destination);

  ///*** Get media from microphone and create media stream ***///
  // Get mediaStream from microphone
  const mediaStream = await getMediastreamFromMicrophone();

  // Create media stream source from microphone media stream
  const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);

  // Get sample rate from media stream source
  const sampleRate = mediaStreamSource.context.sampleRate;

  // Create Downsampler
  const downsampler = new Worker('./downsampling_worker.js');

  ///*** Setup audio processing and connect media stream source to audio processor ***///
  // Create audio processor to
  const processedAudio = processAudio(
    audioBufferMono,
    downsampler,
    sampleRate,
    socket
  );

  // Connect media stream source to audio processor
  mediaStreamSource.connect(processedAudio);
}

function stopRecording() {
  // Stop recording
}

function stopMicrophone() {
  // Start microphone
}

async function getMediastreamFromMicrophone() {
  // Create mediaStream from microphone
  if (navigator.mediaDevices.getUserMedia) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    return mediaStream;
  }
}

async function createAudioContext() {
  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('voice-processor.js');
  return audioContext;
}

function processAudio(audioBufferMono, downsampler, sampleRate, socket) {
  // Initialize downsampler with sample rate
  downsampler.postMessage({ command: 'init', inputSampleRate: sampleRate });

  // When voice processor has message, process result buffer (event.data) in downsampler
  audioBufferMono.port.onmessage = (event) => {
    downsampler.postMessage({ command: 'process', inputFrame: event.data });
  };

  // When downsampler has message, emit result buffer (event.data.buffer) via socket
  downsampler.onmessage = (event) => {
    socket.emit('stream-data', event.data.buffer);
  };

  // When socket receives recognize, output results in console
  socket.on('recognize', (results) => {
    console.log('recognized:', results);
  });
  return audioBufferMono;
}

export default startRecording;
