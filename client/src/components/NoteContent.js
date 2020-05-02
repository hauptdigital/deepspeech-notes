import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';

const NoteContent = styled.textarea`
  ${noteBaseStyles};
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
  margin: 6px 0;
  flex-grow: 2;
  padding-right: 10px;
  overflow: hidden;
  &:focus,
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
    padding-right: 0px;
    overflow-y: scroll;
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

export default NoteContent;
