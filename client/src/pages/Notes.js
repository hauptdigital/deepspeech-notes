import React from 'react';
import Title from '../components/Title';
import NoteContent from '../components/NoteContent';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteContent, setNoteContent] = React.useState('TEST Test');

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
      <Title>Note</Title>
      <NoteContent
        onChange={handleNoteContentChange}
        disabled={isRecording}
        value={noteContent}
        placeholder="Note"
      />
      <div>{isRecording ? 'listening...' : ''}</div>
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
