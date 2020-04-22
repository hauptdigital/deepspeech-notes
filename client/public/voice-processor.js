class voiceProcessor extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
  }

  process(inputs) {
    const channels = inputs[0];
    const inputChannelMono = channels[0];
    this.port.postMessage(inputChannelMono);

    return true;
  }
}

registerProcessor('voice-processor', voiceProcessor);
