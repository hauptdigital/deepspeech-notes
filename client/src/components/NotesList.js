import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import NoteListView from './NoteListView';

const NotesListWrapper = styled.div`
  max-width: 600px;
  width: 100%;
`;

function NotesList(props) {
  return (
    <NotesListWrapper>
      {props.notes.map((note) => {
        const noteHasTitle = note.title ? true : false;
        const noteHasContent = note.content ? true : false;
        if (noteHasTitle || noteHasContent) {
          return (
            <NoteListView
              key={note._id}
              searchQuery={props.searchQuery}
              noteId={note._id}
              noteHasTitle={noteHasTitle}
              noteHasContent={noteHasContent}
              content={note.content}
              title={note.title}
            />
          );
        } else {
          return null;
        }
      })}
    </NotesListWrapper>
  );
}

NotesList.propTypes = {
  notes: PropTypes.array,
  searchQuery: PropTypes.string,
};

export default NotesList;
