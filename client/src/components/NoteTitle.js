import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';

const NoteTitle = styled.textarea`
  ${noteBaseStyles};
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.secondary};
  margin: 6px 0;
  &:focus,
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.altTwo};
    opacity: 0.4;
  }
  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: transparent;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${(props) => props.theme.colors.light};
  }
`;

export default NoteTitle;
