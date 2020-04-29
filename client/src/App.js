import React from 'react';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Container from './components/Container';
import Notes from './pages/Notes';
import About from './pages/About';
import Statistics from './pages/Statistics';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Notes />
            </Route>
            <Route path="/note/:noteId" exact>
              <Notes />
            </Route>
            <Route path="/note" exact>
              <Notes />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/statistics">
              <Statistics />
            </Route>
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default App;
