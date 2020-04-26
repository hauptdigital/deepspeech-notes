import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { audioContext } from '../utils/audio';

const AudioWaveform = styled.canvas`
  display: flex;
  align-items: center;
  font-size: 20px;
  font-family: MontSerrat;
  min-height: 100px;
  color: ${(props) => props.theme.colors.secondary};
`;

function AudioVisualizer(props) {
  React.useEffect(() => {
    if (props.isRecording) {
      // Create audio analyser from audio context
      const audioAnalyser = audioContext.createAnalyser();

      // Set Fast Fourier Transform (ttf) to frequency domain
      audioAnalyser.fftSize = 256;

      console.log(audioAnalyser);
    } else {
      // stopped recording
    }
  }, [props.isRecording]);
  return <AudioWaveform></AudioWaveform>;
}

AudioVisualizer.propTypes = {
  isRecording: PropTypes.bool,
};

export default AudioVisualizer;
