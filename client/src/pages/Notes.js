import React from 'react';
import NoteContainer from '../components/NoteContainer';
import NoteTitle from '../components/NoteTitle';
import NoteContent from '../components/NoteContent';
import NoteContentReadOnly from '../components/NoteContentReadOnly';
import AudioVisualizer from '../components/AudioVisualizer';
import RecordButton from '../components/RecordButton';
import { startRecording, stopRecording, getSocket } from '../utils/audio';

function Notes() {
  const [isRecording, setIsRecording] = React.useState(false);
  const [noteTitle, setTitleContent] = React.useState();
  const [noteContent, setNoteContent] = React.useState({
    text: '',
    recognizedText: '',
  });
  const placeholders = { title: 'Title', note: 'Note' };

  function handleRecordButtonClick() {
    if (!isRecording) {
      setIsRecording(startRecording());
    } else {
      setIsRecording(stopRecording());
      setNoteContent({
        text: noteContent.text.trim() + ' ' + noteContent.recognizedText.trim(),
        recognizedText: '',
      });
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
    setTitleContent(event.target.value);
  }

  function handleNoteContentChange(event) {
    setNoteContent({ text: event.target.value, recognizedText: '' });
  }

  React.useEffect(() => {
    if (!isRecording) {
      return;
    }

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
            value={noteContent.text}
            placeholder={placeholders.note}
          />
        )}
      </NoteContainer>
      <AudioVisualizer>{isRecording ? 'listening...' : ''}</AudioVisualizer>
      <RecordButton
        isRecording={isRecording}
        onRecordButtonClick={handleRecordButtonClick}
      />
    </>
  );
}

export default Notes;
