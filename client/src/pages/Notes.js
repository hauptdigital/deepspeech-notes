import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import RecordButton from '../components/RecordButton';
import startMicrophone from '../utils/microphone';

function Notes() {
  return (
    <Container>
      <Title>Notes</Title>
      <RecordButton onClick={startMicrophone} />
    </Container>
  );
}

export default Notes;
