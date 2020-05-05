import styled from '@emotion/styled';
import noteBaseStyles from './noteBaseStyles';

const NoteTitle = styled.input`
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
`;

export default NoteTitle;
