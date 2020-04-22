import React from 'react';
import Title from '../components/Title';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording } from '../utils/audio';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);

  function handleRecordButtonClick() {
    if (!isRecording) {
      setIsRecording(startRecording());
    } else {
      setIsRecording(stopRecording());
    }
  }

  return (
    <>
      <Title>Notes</Title>
      <RecordButton
        isRecording={isRecording}
        handleRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
