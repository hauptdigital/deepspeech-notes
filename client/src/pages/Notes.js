import React from 'react';
import { getNotes } from '../api/notes';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar.js';
import NotesList from '../components/NotesList';

function ListNotes() {
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    // Get all notes
    getNotes().then((notes) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <SearchBar />
      {notes.length > 0 ? (
        <NotesList notes={notes} />
      ) : (
        <Container>Go ahead and create your first note :-)</Container>
      )}
    </>
  );
}

export default ListNotes;
