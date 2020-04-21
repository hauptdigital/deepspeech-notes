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

async function startMicrophone() {
  // Connect to socket
  const socket = io(getSocketURL());

  // Create audioContext
  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('voice-processor.js');

  // Create mediaStream from microphone
  if (navigator.mediaDevices.getUserMedia) {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });

    connectMediaStream(audioContext, mediaStream, socket);
  }
}

function connectMediaStream(audioContext, mediaStream, socket) {
  console.log('started recording');

  // Create mediaStreamSource from microphone mediaStream
  const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);

  const audioProcessor = createAudioProcessor(
    audioContext,
    mediaStreamSource,
    socket
  );
  mediaStreamSource.connect(audioProcessor);
}

function showGetUserMediaError(error) {
  console.error('Recording error', error.name);
}

function createAudioProcessor(audioContext, mediaStreamSource, socket) {
  const audioBufferMono = new AudioWorkletNode(audioContext, 'voice-processor');
  audioBufferMono.connect(audioContext.destination);
  const sampleRate = mediaStreamSource.context.sampleRate;

  const downsampler = new Worker('./downsampling_worker.js');
  downsampler.postMessage({ command: 'init', inputSampleRate: sampleRate });

  audioBufferMono.port.onmessage = (event) => {
    /*console.log('message kommt vom processor:' + event.data);*/
    downsampler.postMessage({ command: 'process', inputFrame: event.data });
  };

  downsampler.onmessage = (event) => {
    socket.emit('stream-data', event.data.buffer);
  };

  socket.on('recognize', (results) => {
    console.log('recognized:', results);
  });

  return audioBufferMono;
}

export default startMicrophone;
