import React from 'react';
import { postNote } from '../api/notes';

export default function useCreateNote() {
  const [noteId, setNoteId] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function doCreateNote() {
    try {
      setLoading(true);
      setError(false);
      const noteId = await postNote();
      setNoteId(noteId);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return [{ noteId, error, loading }, doCreateNote];
}
