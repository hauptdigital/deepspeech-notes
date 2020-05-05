import { css } from '@emotion/core';

const noteBaseStyles = (props) => css`
  font-family: MontSerrat;
  caret-color: ${props.theme.colors.secondary};
  background: transparent;
  border: none;
  outline: none;
  resize: none;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  max-width: 600px;
  transition: 0.3s;
`;

export default noteBaseStyles;
