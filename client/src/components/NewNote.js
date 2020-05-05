import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const NewNoteButton = styled.button`
  font-family: MontSerrat;
  font-weight: bold;
  border: none;
  background: linear-gradient(to right, #f3ada5, #ec693f);
  color: ${(props) => props.theme.colors.primary};
  @media (min-width: 768px) {
    font-size: 20px;
    border-radius: 5px;
    position: absolute;
    top: 15px;
    right: 75px;
    padding: 8px 15px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
    width: 75px;
    height: 75px;
    border-radius: 100px;
    position: fixed;
    bottom: 15px;
    right: 15px;
    box-shadow: 0 0 14px 1px #00000075;
  }
`;

function NewNote(props) {
  const history = useHistory();

  function handleNewNoteButtonClick() {
    history.push(`/note/`);
  }
  return (
    <NewNoteButton onClick={handleNewNoteButtonClick}>
      {props.text}
    </NewNoteButton>
  );
}

NewNote.propTypes = {
  text: PropTypes.string,
};

export default NewNote;
