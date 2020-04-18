import React from 'react';
import RecordButton from '../components/RecordButton';

export default {
  title: 'Record Button',
  component: RecordButton,
};

export const Default = () => <RecordButton isRecording={false} />;
export const Active = () => <RecordButton isRecording={true} />;
