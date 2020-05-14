import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import cogoToast from 'cogo-toast';
import { getNote, updateNote } from '../api/notes';
import Container from '../components/Container';
import { ReactComponent as Loading } from '../assets/loading.svg';
import NoteContainer from '../components/NoteContainer';
import BackLink from '../components/BackLink';
import NoteTitle from '../components/NoteTitle';
import Divider from '../components/Divider';
import NoteContent from '../components/NoteContent';
import NoteContentReadOnly from '../components/NoteContentReadOnly';
import AudioVisualizer from '../components/AudioVisualizer';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const { noteId } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRecording, setIsRecording] = React.useState(false);

  const [note, setNote] = React.useState({
    title: '',
    content: '',
    audioLength: 0,
  });

  const [noteTitle, setNoteTitle] = React.useState('');
  const [noteText, setNoteText] = React.useState('');
  const [noteRecognizedText, setNoteRecognizedText] = React.useState('');
  const [noteAudioLength, setNoteAudioLength] = React.useState(0);

  const placeholders = { title: 'Title', note: 'Note' };

  async function handleRecordButtonClick() {
    if (!isRecording) {
      await startRecording();
      setIsRecording(true);
    } else {
      await stopRecording();
      setIsRecording(false);
      addRecognizedText();
    }
  }

  function handleNoteTitleChange(event) {
    setNoteTitle(event.target.value);
  }

  function handleNoteContentChange(event) {
    setNoteText(event.target.value);
  }

  function handleNoteBlur() {
    setNote({
      title: noteTitle,
      content: noteText,
      audioLength: noteAudioLength,
    });
  }

  const addRecognizedDetails = useCallback(
    (recognized) => {
      setNoteText(noteText.trim() + ' ' + noteRecognizedText.trim());
      setNoteRecognizedText(' ' + recognized.text);
      setNoteAudioLength(noteAudioLength + recognized.noteAudioLength);
    },
    [noteText, noteRecognizedText, noteAudioLength]
  );

  const addRecognizedText = useCallback(() => {
    setNoteText(noteText.trim() + ' ' + noteRecognizedText.trim());
    setNoteRecognizedText('');
  }, [noteText, noteRecognizedText]);

  React.useEffect(() => {
    if (noteId) {
      // Get note title and content if noteId is set
      getNote(noteId).then((note) => {
        setNoteTitle(note.title ? note.title : '');
        setNoteText(note.content ? note.content : '');
        setNoteAudioLength(note.audioLength ? note.audioLength : 0);
        setIsLoading(false);
      });
    }
  }, [noteId]);

  React.useEffect(() => {
    if (!isRecording) {
      // When recording stops, add recognized text to note text
      return;
    }

    // While recording, add new text chunks
    function handleRecognize(recognized) {
      addRecognizedDetails(recognized);
    }

    const socket = getSocket();
    socket.on('recognize', handleRecognize);

    return () => {
      socket.removeListener('recognize', handleRecognize);
    };
  }, [isRecording, addRecognizedDetails, addRecognizedText]);

  React.useEffect(() => {
    if (isLoading || (note.title === '' && note.content === '')) {
      return;
    }

    async function saveNote() {
      updateNote(note, noteId).then((response) => {
        if (response.modifiedCount === 1) {
          cogoToast.success('Note updated!', {
            bar: { style: 'none' },
          });
        }
      });
    }

    saveNote();
  }, [note, isLoading, noteId]);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <NoteContainer>
        <BackLink />
        <NoteTitle
          onChange={handleNoteTitleChange}
          onBlur={handleNoteBlur}
          value={noteTitle}
          placeholder={placeholders.title}
        />
        <Divider />
        {isRecording ? (
          <NoteContentReadOnly
            noteText={noteText}
            noteRecognizedText={noteRecognizedText}
            placeholder={placeholders.note}
          />
        ) : (
          <NoteContent
            onChange={handleNoteContentChange}
            onBlur={handleNoteBlur}
            value={noteText}
            placeholder={placeholders.note}
          />
        )}
      </NoteContainer>
      <AudioVisualizer isRecording={isRecording} />
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
