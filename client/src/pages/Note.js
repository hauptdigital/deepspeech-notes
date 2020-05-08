import React from 'react';
import { useParams } from 'react-router-dom';
import { getNote, postNote, updateNote } from '../api/notes';
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
  const [currentNodeId, setCurrentNodeId] = React.useState({});
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteTitle, setNoteTitle] = React.useState();
  const [noteContent, setNoteContent] = React.useState({
    text: '',
    recognizedText: '',
    audioLength: 0,
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
      setTimeout(
        () =>
          addRecognizedDetails({
            text: 'hello new fishes coding bootcamp',
            audioLength: 480,
          }),
        3000
      );
      setTimeout(
        () =>
          addRecognizedDetails({
            text: 'this is a demonstration of speech to text',
            audioLength: 480,
          }),
        6000
      );
      setTimeout(
        () =>
          addRecognizedDetails({
            text: 'remember to have fun',
            audioLength: 480,
          }),
        9000
      );
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

  function addRecognizedDetails(recognized) {
    setNoteContent((noteContent) => {
      const updatedNoteContent = {
        text: noteContent.text.trim() + ' ' + noteContent.recognizedText.trim(),
        recognizedText: ' ' + recognized.text,
        audioLength: noteContent.audioLength + recognized.audioLength,
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
        setNoteContent({
          text: note.content,
          recognizedText: '',
          audioLength: note.audioLength ? note.audioLength : 0,
        });
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
      addRecognizedDetails(recognized);
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
        <BackLink />
        <NoteTitle
          onChange={handleNoteTitleChange}
          onBlur={saveNote}
          value={noteTitle}
          placeholder={placeholders.title}
        />
        <Divider />
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
