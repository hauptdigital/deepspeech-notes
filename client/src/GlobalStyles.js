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
        }
        a,
        a:hover,
        a:active,
        a:visited {
          color: ${theme.colors.primary};
        }
        body::-webkit-scrollbar-track {
          border-radius: 10px;
          background: transparent;
        }

        body::-webkit-scrollbar {
          width: 10px;
        }

        body::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${theme.colors.light};
        }
      `}
    />
  );
}

export default GlobalStyle;
