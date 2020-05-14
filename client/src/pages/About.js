import React from 'react';
import styled from '@emotion/styled';
import Title from '../components/Title';

const PageTitle = styled(Title)`
  max-width: 600px;
`;

const SectionTitle = styled.h2`
  max-width: 600px;
`;

const SectionSubTitle = styled.h3`
  width: 100%;
  padding: 0rem 0.5rem;
  max-width: 600px;
`;

const Paragraph = styled.p`
  max-width: 600px;
  width: 100%;
  font-size: 18px;
`;

const TechList = styled.ul`
  max-width: 600px;
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const Tech = styled.li`
  padding: 0.5rem;
  background-color: #ffffff47;
  border-radius: 5px;
  margin: 0.5rem 0.5rem;
`;

const LinkList = styled.div`
  max-width: 600px;
  width: 100%;
  font-size: 18px;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
`;

const Link = styled.a`
  padding: 0.5rem;
  border-radius: 5px;
  margin: 0.5rem 0.5rem;
  background-color: #ffffff47;
  text-decoration: none;
  &:hover {
    background: linear-gradient(to right, #2c6dd5, #78c1d4);
  }
`;

function About() {
  return (
    <>
      <PageTitle>about</PageTitle>
      <Paragraph>
        DeepSpeechNotes is a note taking app that uses Mozilla's DeepSpeech, Web
        Audio API and Node Voice Activity Detection to transcribe speech into
        text on the go.
      </Paragraph>

      <Paragraph>
        It is my graduation project that was coded from scratch in 4 weeks. My
        main goal was to showcase current Open Source Text-To-Speech technology.
      </Paragraph>

      <Paragraph>
        I wanted to learn something new in terms of technology, so I picked the
        topics Machine Learning and Speech-To-Text recognition and apply them
        practically. The result is DeepSpeechNotes, a note taking app that
        transcribes voice in near real-time.
      </Paragraph>
      <SectionTitle>
        <span role="img" aria-label="rocket-symbol">
          🚀
        </span>{' '}
        Built With
      </SectionTitle>
      <SectionSubTitle>
        <span role="img" aria-label="polished-nails-symbol">
          💅
        </span>{' '}
        Front End
      </SectionSubTitle>

      <TechList>
        <Tech>React</Tech>
        <Tech>Web Audio API</Tech>
        <Tech>@picovoice/web-voice-processor</Tech>
        <Tech>Socket.io-client</Tech>
        <Tech>@emotion/core and styled</Tech>
        <Tech>Storybook</Tech>
      </TechList>
      <SectionSubTitle>
        <span role="img" aria-label="bricks-symbol">
          🧱
        </span>{' '}
        Back End
      </SectionSubTitle>

      <TechList>
        <Tech>Express</Tech>
        <Tech>MongoDB</Tech>
        <Tech>DeepSpeech</Tech>
        <Tech>Node Voice Activity Detection</Tech>
        <Tech>Socket.io</Tech>
      </TechList>

      <SectionTitle>
        {' '}
        <span role="img" aria-label="it-expert-symbol">
          👨‍💻
        </span>{' '}
        Who am I?
      </SectionTitle>
      <Paragraph>
        My name is Marc, and I am a Freelance Web Developer from Cologne,
        Germany. If you have questions, please feel free to contact me:
      </Paragraph>
      <LinkList>
        <Link href="https://github.com/hauptdigital/">GitHub</Link>
        <Link href="https://www.xing.com/profile/Marc_Haupt2">XING</Link>
        <Link href="https://www.linkedin.com/in/marchaupt2/">LinkedIN</Link>
      </LinkList>
    </>
  );
}

export default About;
