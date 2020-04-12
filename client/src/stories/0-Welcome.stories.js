import React from 'react';
import Container from '../components/Container';
import Title from '../components/Title';
import SubTitle from '../components/SubTitle';

export default {
  title: 'Welcome',
  component: 'to deepspeech notes storybook',
};

export const ToDeepspeechNotesStorybook = () => (
  <Container>
    <Title>Welcome to the deepspeech notes storybook</Title>
    <SubTitle>About</SubTitle>
    <p>
      This storybook is used to develop all components and screens for the
      deepspeech notes app
    </p>
  </Container>
);
