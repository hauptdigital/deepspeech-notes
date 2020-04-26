import React from 'react';
import TextChunk from '../components/TextChunk';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';
import { CSSTransitionGroup } from 'react-transition-group';

const NoteContentTextFromAudio = styled.div`
  ${noteBaseStyles};
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 12.5px;
  flex-grow: 2;
  &:focus,
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
    <NoteContentTextFromAudio placeholder={props.placeholder}>
      {props.noteContent.text !== '' && (
        <TextChunk>{props.noteContent.text}</TextChunk>
      )}
      {props.noteContent.recognizedText !== '' && (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionAppear={true}
          transitionLeave={false}
          transitionEnterTimeout={300}
          transitionAppearTimeout={300}
        >
          <TextChunk
            key={props.noteContent.text + props.noteContent.recognizedText}
            isNew={true}
          >
            {props.noteContent.recognizedText}
          </TextChunk>
        </CSSTransitionGroup>
      )}
    </NoteContentTextFromAudio>
  );
}

NoteContentReadOnly.propTypes = {
  noteContent: PropTypes.exact({
    text: PropTypes.string,
    recognizedText: PropTypes.string,
  }),
  placeholder: PropTypes.string,
};

export default NoteContentReadOnly;
