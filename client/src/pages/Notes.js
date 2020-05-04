import React, { useCallback } from 'react';
import { throttle } from 'throttle-debounce';
import { getNotes } from '../api/notes';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar.js';
import NotesList from '../components/NotesList';

function ListNotes() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [throttledSearchQuery, setThrottledSearchQuery] = React.useState('');
  const [notes, setNotes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const doThrottledSearchQueryCallback = useCallback(
    throttle(500, (searchQuery) => setThrottledSearchQuery(searchQuery)),
    []
  );

  function handleSearchFieldChange(event) {
    setSearchQuery(event.target.value);
    doThrottledSearchQueryCallback(event.target.value);
  }

  React.useEffect(() => {
    // Get queried notes
    getNotes(throttledSearchQuery).then((notes) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, [throttledSearchQuery]);

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  return (
    <>
      <SearchBar
        onSearchBarChange={handleSearchFieldChange}
        searchQuery={searchQuery}
      />
      {notes.length > 0 ? (
        <NotesList notes={notes} />
      ) : (
        <Container>Go ahead and create your first note :-)</Container>
      )}
    </>
  );
}

export default ListNotes;
