import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const NoteCardListView = styled.div`
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 1rem;
  transition: 0.3s;
  margin-bottom: 12.5px;
  max-width: 195px;
  cursor: pointer;
  box-shadow: 0 0 0 2px ${(props) => props.theme.colors.light};
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
`;

const NoteTitleListView = styled.p`
  font-family: MontSerrat;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
  margin: 0;
`;

const NoteContentListView = styled.p`
  font-family: MontSerrat;
  font-size: 18px;
  margin: 0;
`;

function NoteListView(props) {
  return (
    <NoteCardListView>
      {props.noteHasTitle && (
        <NoteTitleListView>{props.title}</NoteTitleListView>
      )}
      {props.noteHasContent && (
        <NoteContentListView>
          {props.content.substring(0, 150)}
        </NoteContentListView>
      )}
    </NoteCardListView>
  );
}

NoteListView.propTypes = {
  noteHasTitle: PropTypes.bool,
  noteHasContent: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default NoteListView;
