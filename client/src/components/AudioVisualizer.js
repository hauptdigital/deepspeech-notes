import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../theme';
import { audioContext, mediaStreamSource } from '../utils/audio';

const AudioWaveForm = styled.canvas`
  width: 100%;
  max-width: 600px;
  height: 150px;
`;

function AudioVisualizer(props) {
  const canvas = useRef(null);
  const AudioWaveFormCanvas = canvas.current;

  let audioAnalyser;
  let bufferLength;
  let dataArray;
  let canvasContext;
  let width;
  let height;

  function draw() {
    requestAnimationFrame(draw);

    audioAnalyser.getByteFrequencyData(dataArray);

    canvasContext.fillStyle = theme.colors.background;
    canvasContext.fillRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;

      // Draw bar top
      //canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      canvasContext.fillStyle = theme.colors.secondary;
      canvasContext.fillRect(
        x,
        height / 2 - barHeight / 2,
        barWidth,
        barHeight
      );

      // Draw rounded end top
      canvasContext.beginPath();
      canvasContext.arc(
        x + barWidth / 2,
        height / 2 - barHeight / 2,
        barWidth / 2,
        0,
        2 * Math.PI
      );
      canvasContext.fill();

      // Draw rounded end bottom
      canvasContext.beginPath();
      canvasContext.arc(
        x + barWidth / 2,
        height / 2 + barHeight / 2,
        barWidth / 2,
        0,
        2 * Math.PI
      );
      canvasContext.fill();

      x += barWidth + 20;
    }
  }

  React.useEffect(() => {
    if (props.isRecording) {
      // Create audio analyser from audio context
      audioAnalyser = audioContext.createAnalyser();
      mediaStreamSource.connect(audioAnalyser);

      // Set Fast Fourier Transform (ttf) to frequency domain
      audioAnalyser.fftSize = 256;
      bufferLength = audioAnalyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      canvasContext = AudioWaveFormCanvas.getContext('2d');
      AudioWaveFormCanvas.width = AudioWaveFormCanvas.offsetWidth;
      AudioWaveFormCanvas.height = AudioWaveFormCanvas.offsetHeight;
      width = AudioWaveFormCanvas.offsetWidth;
      height = AudioWaveFormCanvas.offsetHeight;
      console.log(width);
      console.log(height);

      // clear previous visualization in canvas
      canvasContext.clearRect(0, 0, width, height);

      draw();
    } else {
      // stopped recording
    }
  }, [props.isRecording]);
  return <AudioWaveForm ref={canvas} />;
}

AudioVisualizer.propTypes = {
  isRecording: PropTypes.bool,
};

export default AudioVisualizer;
