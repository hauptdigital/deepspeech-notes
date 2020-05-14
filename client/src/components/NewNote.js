import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const NewNoteButton = styled.button`
  cursor: pointer;
  font-family: MontSerrat;
  font-weight: bold;
  text-decoration: none;
  border: none;
  background: linear-gradient(to right, #f3ada5, #ec693f);
  color: ${(props) => props.theme.colors.primary};
  &:hover,
  &:active {
    background: linear-gradient(to right, #2c6dd5, #78c1d4);
  }
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
    text-align: center;
    display: flex;
    align-items: center;
  }
`;

function NewNote(props) {
  return (
    <NewNoteButton onClick={props.onNewNoteClick}>{props.text}</NewNoteButton>
  );
}

NewNote.propTypes = {
  text: PropTypes.string,
  onNewNoteClick: PropTypes.func,
};

export default NewNote;
