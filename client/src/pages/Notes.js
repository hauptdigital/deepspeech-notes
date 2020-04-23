import React from 'react';
import Title from '../components/Title';
import NoteContent from '../components/NoteContent';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Note() {
  const [isRecording, setIsRecording] = React.useState(false);
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

  React.useEffect(() => {
    if (!isRecording) {
      return;
    }

    function handleRecognize(recognized) {
      updateNoteContent(recognized.text);
    }

    const socket = getSocket();
    socket.on('recognize', handleRecognize);

    return () => {
      socket.removeListener('recognize', handleRecognize);
    };
  }, [isRecording]);

  return (
    <>
      <Title>Note</Title>
      <NoteContent>{noteContent}</NoteContent>
      <div>{isRecording ? 'listening...' : ''}</div>
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Note;
