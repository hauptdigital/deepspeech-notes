import React from 'react';
import TextChunk from '../components/TextChunk';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const NoteContentTextFromAudio = styled.div`
  font-size: 20px;
  font-family: MontSerrat;
  color: ${(props) => props.theme.colors.primary};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  margin-bottom: 12.5px;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  flex-grow: 2;
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
  &:empty::before {
  color: ${(props) => props.theme.colors.altTwo};
  opacity: 0.4;
  content: "${(props) => props.placeholder}";
  }
`;

function NoteContentReadOnly(props) {
  return (
    <NoteContentTextFromAudio>
      <TextChunk>{props.noteContent.text}</TextChunk>
      {props.noteContent.recognizedText !== '' && (
        <TextChunk isNew={true}>{props.noteContent.recognizedText}</TextChunk>
      )}
    </NoteContentTextFromAudio>
  );
}

NoteContentReadOnly.propTypes = {
  noteContent: PropTypes.exact({
    text: PropTypes.string,
    recognizedText: PropTypes.string,
  }),
};

export default NoteContentReadOnly;
