import React from 'react';
import NoteContainer from '../components/NoteContainer';
import NoteTitle from '../components/NoteTitle';
import NoteContent from '../components/NoteContent';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteTitle, setTitleContent] = React.useState('');
  const [noteContent, setNoteContent] = React.useState('');

  function handleRecordButtonClick() {
    if (!isRecording) {
      setIsRecording(startRecording());
    } else {
      setIsRecording(stopRecording());
    }
  }

  function updateNoteContent(text) {
    setNoteContent((noteContent) => {
      return noteContent + ' ' + text;
    });
  }

  function handleNoteTitleChange(event) {
    setTitleContent(event.target.value);
  }

  function handleNoteContentChange(event) {
    setNoteContent(event.target.value);
  }

  React.useEffect(() => {
    if (!isRecording) {
      return;
    }

    function handleRecognize(recognized) {
      updateNoteContent(recognized.text);
    }

    const socket = getSocket();
    socket.on('recognize', handleRecognize);
    socket.on('recognize', (recognized) => {
      console.log(recognized.text);
    });

    return () => {
      socket.removeListener('recognize', handleRecognize);
    };
  }, [isRecording]);

  return (
    <>
      <NoteContainer>
        <NoteTitle
          onChange={handleNoteTitleChange}
          value={noteTitle}
          placeholder="Title"
        />
        <NoteContent
          onChange={handleNoteContentChange}
          disabled={isRecording}
          value={noteContent}
          placeholder="Note"
        />
      </NoteContainer>
      <div>{isRecording ? 'listening...' : ''}</div>
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
