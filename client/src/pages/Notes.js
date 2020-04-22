import React from 'react';
import Title from '../components/Title';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteContent, setNoteContent] = React.useState('');

  function handleRecordButtonClick() {
    if (!isRecording) {
      setIsRecording(startRecording());
      const socket = getSocket();
      socket.on('recognize', (results) => {
        updateNoteContent(results.text);
      });
    } else {
      setIsRecording(stopRecording().isRecording);
    }
  }

  function updateNoteContent(text) {
    setNoteContent((noteContent) => {
      return noteContent + ' ' + text;
    });
  }

  return (
    <>
      <Title>Notes</Title>
      <div>{noteContent}</div>
      <div>{isRecording ? 'listening...' : ''}</div>
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
