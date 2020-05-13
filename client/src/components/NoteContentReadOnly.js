import React, { useRef } from 'react';
import TextChunk from '../components/TextChunk';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const NoteContentTextFromAudio = styled.div`
  ${noteBaseStyles};
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 12.5px;
  flex-grow: 2;
  &:empty::before {
  color: ${(props) => props.theme.colors.altTwo};
  opacity: 0.4;
  content: "${(props) => props.placeholder}";
  }
  overflow: hidden;
  height: 190px;
`;

const FadeoutText = styled.div`
  height: 150px;
  margin-bottom: -150px;
  width: 100%;
  z-index: 2000;
  background-image: linear-gradient(
    to top,
    rgba(255, 0, 0, 0),
    rgba(79, 66, 112, 1)
  );
`;

function NoteContentReadOnly(props) {
  const [showFadeoutText, setShowFadeoutText] = React.useState(false);
  const scrollReference = useRef(null);
  const newTextRef = React.useRef(null);

  React.useEffect(() => {
    // Scroll to bottom of noteContent div when new text appears
    scrollReference.current.scrollTop = scrollReference.current.scrollHeight;
    scrollReference.current.scrollHeight > 190
      ? setShowFadeoutText(true)
      : setShowFadeoutText(false);
  }, [props.noteContent.recognizedText]);

  return (
    <>
      {showFadeoutText && <FadeoutText />}
      <NoteContentTextFromAudio
        ref={scrollReference}
        placeholder={props.placeholder}
      >
        {props.noteContent.text !== '' && (
          <TextChunk>{props.noteContent.text}</TextChunk>
        )}
        {props.noteContent.recognizedText !== '' && (
          <TransitionGroup component={null} exit={false} appear={true}>
            <CSSTransition
              key={props.noteContent.text + props.noteContent.recognizedText}
              nodeRef={newTextRef}
              timeout={300}
              classNames="fadeIn"
            >
              <TextChunk ref={newTextRef} isNew={true}>
                {props.noteContent.recognizedText}
              </TextChunk>
            </CSSTransition>
          </TransitionGroup>
        )}
      </NoteContentTextFromAudio>
    </>
  );
}

NoteContentReadOnly.propTypes = {
  noteContent: PropTypes.exact({
    text: PropTypes.string,
    recognizedText: PropTypes.string,
    audioLength: PropTypes.number,
  }),
  placeholder: PropTypes.string,
};

export default NoteContentReadOnly;
