import React from 'react';
import { ReactComponent as MicrophoneIcon } from '../assets/microphone.svg';
import styled from '@emotion/styled';

const MicrophoneButtonGradientBorder = styled.div`
  border-radius: 100px;
  width: 57px;
  height: 57px;
  background-color: ${(props) => props.theme.colors.altTwo};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s;
`;

const MicrophoneButton = styled.button`
  border-radius: 100px;
  border: none;
  width: 52px;
  height: 52px;
  background-color: ${(props) => props.theme.colors.altTwo};
  display: flex;
  justify-content: center;
  transition: 0.5s;
  cursor: pointer;
`;

function RecordButton() {
  return (
    <MicrophoneButtonGradientBorder>
      <MicrophoneButton>
        <MicrophoneIcon />
      </MicrophoneButton>
    </MicrophoneButtonGradientBorder>
  );
}

export default RecordButton;
