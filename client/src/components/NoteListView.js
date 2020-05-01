import React from 'react';
import { useHistory } from 'react-router-dom';
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
  width: 100%;
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
  &:after {
    content: '';
    display: block;
    width: 90px;
    height: 2px;
    background: ${(props) => props.theme.colors.altOne};
    margin: 1rem 0;
  }
`;

const NoteContentListView = styled.p`
  font-family: MontSerrat;
  font-size: 18px;
  margin: 0;
`;

function NoteListView(props) {
  const history = useHistory();

  function handleNoteListViewClick(noteId) {
    history.push(`/note/${noteId}`);
  }

  return (
    <NoteCardListView onClick={() => handleNoteListViewClick(props.noteId)}>
      {props.noteHasTitle && (
        <NoteTitleListView>{props.title}</NoteTitleListView>
      )}
      {props.noteHasContent && (
        <NoteContentListView>
          {props.content.substring(0, 250)}
        </NoteContentListView>
      )}
    </NoteCardListView>
  );
}

NoteListView.propTypes = {
  noteId: PropTypes.string,
  noteHasTitle: PropTypes.bool,
  noteHasContent: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default NoteListView;
