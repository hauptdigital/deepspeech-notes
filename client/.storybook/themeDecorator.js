import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import GlobalStyles from '../src/GlobalStyles';
import theme from '../src/theme';
import Container from '../src/components/Container';

const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Container>{storyFn()}</Container>
  </ThemeProvider>
);

export default ThemeDecorator;
