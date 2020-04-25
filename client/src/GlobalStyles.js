import React from 'react';
import { Global, css } from '@emotion/core';

function GlobalStyle() {
  return (
    <Global
      styles={(theme) => css`
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

        /* fadeIn animation */

        .fadeIn-enter,
        .fadeIn-appear {
          opacity: 0.01;
          position: relative;
          bottom: 20px;
        }

        .fadeIn-enter-active,
        .fadeIn-appear-active {
          opacity: 1;
          transition: all 300ms ease-in;
          position: relative;
          bottom: 0px;
        }
      `}
    />
  );
}

export default GlobalStyle;
