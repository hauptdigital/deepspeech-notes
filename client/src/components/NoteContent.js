import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';

const NoteContent = styled.textarea`
  ${noteBaseStyles};
  font-size: 24px;
  font-family: MontSerrat;
  color: ${(props) => props.theme.colors.primary};
  margin: 6px 0;
  flex-grow: 2;
  &:focus,
  &:hover {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors.altTwo};
  }
  &::placeholder {
    color: ${(props) => props.theme.colors.altTwo};
    opacity: 0.4;
  }
`;

export default NoteContent;
