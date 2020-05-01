import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import NoteListView from './NoteListView';

const NotesListWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  max-width: 600px;
  width: 100%;
`;

function NotesList(props) {
  const renderNoteList = props.notes.map((note) => {
    const noteHasTitle = note.title ? true : false;
    const noteHasContent = note.content ? true : false;
    if (noteHasTitle || noteHasContent) {
      return (
        <NoteListView
          key={note._id}
          noteId={note._id}
          noteHasTitle={noteHasTitle}
          noteHasContent={noteHasContent}
          content={note.content}
          title={note.title}
        />
      );
    }
  });

  return <NotesListWrapper>{renderNoteList}</NotesListWrapper>;
}

NotesList.propTypes = {
  notes: PropTypes.array,
};

export default NotesList;
