import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { throttle } from 'throttle-debounce';
import { getNotes } from '../api/notes';
import useCreateNote from '../hooks/useCreateNote';
import Container from '../components/Container';
import { ReactComponent as Loading } from '../assets/loading.svg';
import NewNote from '../components/NewNote';
import SearchBar from '../components/SearchBar.js';
import NotesList from '../components/NotesList';

function ListNotes() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [throttledSearchQuery, setThrottledSearchQuery] = React.useState('');
  const [notes, setNotes] = React.useState([]);
  const [searchIsLoading, setSearchIsLoading] = React.useState(true);
  const [{ noteId, error, loading }, doCreatePost] = useCreateNote();
  const history = useHistory();

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
    setSearchIsLoading(true);
    getNotes(throttledSearchQuery).then((notes) => {
      setNotes(notes);
      setSearchIsLoading(false);
    });
  }, [throttledSearchQuery]);

  React.useEffect(() => {
    // Forward to created note
    if (noteId) {
      cogoToast.success('Note created!', {
        bar: { style: 'none' },
      });
      history.push(`/note/${noteId}`);
    }
  }, [noteId, history]);

  if (error) {
    return <Container>error</Container>;
  }

  return (
    <>
      <NewNote onNewNoteClick={doCreatePost} text="New Note" />
      <SearchBar
        onSearchBarChange={handleSearchFieldChange}
        searchQuery={searchQuery}
      />
      {searchIsLoading || loading ? (
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
