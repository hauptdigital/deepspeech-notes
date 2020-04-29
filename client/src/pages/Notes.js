import React from 'react';
import { useParams } from 'react-router-dom';
import { getNote, postNote, updateNote } from '../api/notes';
import NoteContainer from '../components/NoteContainer';
import NoteTitle from '../components/NoteTitle';
import NoteContent from '../components/NoteContent';
import NoteContentReadOnly from '../components/NoteContentReadOnly';
import AudioVisualizer from '../components/AudioVisualizer';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const { noteId } = useParams();
  const [currentNodeId, setCurrentNodeId] = React.useState({});
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState();
  const [noteContent, setNoteContent] = React.useState({
    text: '',
    recognizedText: '',
  });
  const placeholders = { title: 'Title', note: 'Note' };

  async function saveNote() {
    if (currentNodeId) {
      // Update note in DB if there is a noteId collected from parameters
      updateNote({ noteTitle, noteContent }, currentNodeId);
    } else {
      // Create new note in DB
      const createdNoteId = await postNote({ noteTitle, noteContent });
      setCurrentNodeId(createdNoteId);
    }
  }

  async function handleRecordButtonClick() {
    if (!isRecording) {
      await startRecording();
      setIsRecording(true);
    } else {
      await stopRecording();
      setIsRecording(false);
      setNoteContent({
        text: noteContent.text.trim() + ' ' + noteContent.recognizedText.trim(),
        recognizedText: '',
      });

      saveNote();
    }
  }

  function addRecognizedText(recognizedText) {
    setNoteContent((noteContent) => {
      const updatedNoteContent = {
        text: noteContent.text.trim() + ' ' + noteContent.recognizedText.trim(),
        recognizedText: ' ' + recognizedText,
      };
      return updatedNoteContent;
    });
  }

  function handleNoteTitleChange(event) {
    setNoteTitle(event.target.value);
  }

  function handleNoteContentChange(event) {
    setNoteContent({ text: event.target.value, recognizedText: '' });
  }

  React.useEffect(() => {
    if (noteId) {
      // Get note title and content if noteId is set
      getNote(noteId).then((note) => {
        setNoteTitle(note.title);
        setNoteContent({ text: note.content, recognizedText: '' });
      });
    }
    setCurrentNodeId(noteId);
  }, [noteId]);

  React.useEffect(() => {
    if (!isRecording) {
      return;
    }

    // While recording, add new text chunks
    function handleRecognize(recognized) {
      addRecognizedText(recognized.text);
    }

    const socket = getSocket();
    socket.on('recognize', handleRecognize);

    return () => {
      socket.removeListener('recognize', handleRecognize);
    };
  }, [isRecording]);

  return (
    <>
      <NoteContainer>
        <NoteTitle
          onChange={handleNoteTitleChange}
          onBlur={saveNote}
          value={noteTitle}
          placeholder={placeholders.title}
        />
        {isRecording ? (
          <NoteContentReadOnly
            noteContent={noteContent}
            placeholder={placeholders.note}
          />
        ) : (
          <NoteContent
            onChange={handleNoteContentChange}
            onBlur={saveNote}
            value={noteContent.text}
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
