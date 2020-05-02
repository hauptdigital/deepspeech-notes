import React from 'react';
import { Global, css } from '@emotion/core';

function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
        @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
        *,
        *:before,
        *:after {
          box-sizing: border-box;
        }
        body {
          font-size: 16px;
          margin: 0;
          font-family: 'Montserrat', sans-serif;
          background-color: ${theme.colors.background};
          color: ${theme.colors.primary};
          overflow-x: hidden;
        }
        a,
        a:hover,
        a:active,
        a:visited {
          color: ${theme.colors.primary};
        }
      `}
    />
  );
}

export default GlobalStyle;
