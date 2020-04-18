import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import RecordButton from '../components/RecordButton';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);

  function handleRecordButtonClick() {
    setIsRecording(!isRecording);
    console.log(isRecording);
  }

  return (
    <Container>
      <Title>Notes</Title>
      <RecordButton
        onClick={handleRecordButtonClick}
        isRecording={isRecording}
      />
    </Container>
  );
}

export default Notes;
