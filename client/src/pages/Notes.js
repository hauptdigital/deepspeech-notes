import React from 'react';
import { getNotes } from '../api/notes';
import NotesList from '../components/NotesList';

function ListNotes() {
  const [notes, setNotes] = React.useState([]);
  React.useEffect(() => {
    // Get all notes
    getNotes().then((notes) => {
      setNotes(notes);
    });
  }, []);

  return (
    <>
      <div>List of notes</div>
      {notes && <NotesList notes={notes} />}
    </>
  );
}

export default ListNotes;
