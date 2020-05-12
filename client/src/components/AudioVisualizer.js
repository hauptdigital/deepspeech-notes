import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import theme from '../theme';
import { audioContext, mediaStreamSource } from '../utils/audio';

const AudioWaveForm = styled.canvas`
  width: 100%;
  max-width: 600px;
  height: 100px;
`;

function AudioVisualizer(props) {
  const canvas = useRef(null);

  React.useEffect(() => {
    const currentCanvas = canvas.current;
    const canvasContext = currentCanvas.getContext('2d');

    let audioAnalyser;
    let animationFrameId;
    let bufferLength;
    let dataArray;
    let width;
    let height;

    function draw() {
      audioAnalyser.getByteFrequencyData(dataArray);
      canvasContext.fillStyle = theme.colors.background;
      canvasContext.fillRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 0.35;
      let barHeight;
      let x = barWidth;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;

        // Draw bar
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

        // Update x for next bar position
        x += barWidth + (width / bufferLength) * 0.65;
      }

      animationFrameId = requestAnimationFrame(draw);
    }

    function initializeDrawing() {
      // Create audio analyser from audio context and connect to media stream source from microphone
      audioAnalyser = audioContext.createAnalyser();

      mediaStreamSource.connect(audioAnalyser);

      // We want to display 16 bars so Fast Fourier Transform (ttf) is set to 32 and Uint8Array is chosen
      audioAnalyser.fftSize = 32;
      bufferLength = audioAnalyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      // Reset canvas
      resetCanvas(canvasContext);

      // Start drawing
      animationFrameId = requestAnimationFrame(draw);
    }

    function resetCanvas(canvasContext) {
      currentCanvas.width = currentCanvas.offsetWidth;
      currentCanvas.height = currentCanvas.offsetHeight;
      width = currentCanvas.offsetWidth;
      height = currentCanvas.offsetHeight;

      // clear previous visualization in canvas
      canvasContext.clearRect(0, 0, width, height);
    }

    if (props.isRecording) {
      initializeDrawing();
    }

    return () => {
      function stopDrawing() {
        if (animationFrameId > 0) {
          cancelAnimationFrame(animationFrameId);

          // clear previous visualization in canvas
          resetCanvas(canvasContext);
        }
      }

      stopDrawing();
    };
  }, [props.isRecording]);

  return <AudioWaveForm ref={canvas} />;
}

AudioVisualizer.propTypes = {
  isRecording: PropTypes.bool,
};

export default AudioVisualizer;
