import styled from '@emotion/styled';

const NoteTitle = styled.input`
  font-size: 30px;
  font-family: MontSerrat;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
  caret-color: ${(props) => props.theme.colors.secondary};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 12.5px 0;
  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.altTwo};
    opacity: 0.4;
  }
  transition: 0.3s;
`;

export default NoteTitle;
