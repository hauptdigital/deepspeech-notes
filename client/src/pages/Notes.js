import React, { useCallback } from 'react';
import { throttle } from 'throttle-debounce';
import { getNotes } from '../api/notes';
import Container from '../components/Container';
import { ReactComponent as Loading } from '../assets/loading.svg';
import NewNote from '../components/NewNote';
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
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      doThrottledSearchQueryCallback(event.target.value);
    }
  }

  React.useEffect(() => {
    // Get queried notes
    setIsLoading(true);
    getNotes(throttledSearchQuery).then((notes) => {
      setNotes(notes);
      setIsLoading(false);
    });
  }, [throttledSearchQuery]);

  return (
    <>
      <NewNote text="New Note" />
      <SearchBar
        onSearchBarChange={handleSearchFieldChange}
        searchQuery={searchQuery}
      />
      {isLoading ? (
        <Container>
          <Loading />
        </Container>
      ) : notes.length > 0 ? (
        <NotesList notes={notes} searchQuery={searchQuery} />
      ) : (
        <Container>No search results :-(</Container>
      )}
    </>
  );
}

export default ListNotes;
