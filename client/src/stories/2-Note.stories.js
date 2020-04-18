import React from 'react';
import RecordButton from '../components/RecordButton';
import PropTypes from 'prop-types';

export default {
  title: 'Record Button',
  component: RecordButton,
};

export const Default = () => <RecordButton isRecording={false} />;
export const Active = () => <RecordButton isRecording={true} />;

Default.propTypes = {
  isRecording: PropTypes.bool.isRequired,
};

Active.propTypes = {
  isRecording: PropTypes.bool.isRequired,
};
