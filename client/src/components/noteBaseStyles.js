import { css } from '@emotion/core';

const noteBaseStyles = css`
  font-family: MontSerrat;
  caret-color: ${(props) => props.theme.colors.secondary};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  transition: 0.3s;
`;

export default noteBaseStyles;
