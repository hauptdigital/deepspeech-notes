import styled from '@emotion/styled';

const NoteContent = styled.textarea`
  font-size: 20px;
  font-family: MontSerrat;
  color: ${(props) => props.theme.colors.primary};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  margin-bottom: 12.5px;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  flex-grow: 2;
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
`;

export default NoteContent;
