import React from 'react';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import MenuIcon from './components/MenuIcon';
import Container from './components/Container';
import Notes from './pages/Notes';
import Note from './pages/Note';
import About from './pages/About';
import Statistics from './pages/Statistics';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header>
        <MenuIcon />
      </Header>
      <Container>
        <Router>
          <Switch>
            <Route path="/" exact>
              Demo links:
              <Link to="/notes">List all notes</Link>
              <Link to="/note">Create new note</Link>
              <Link to="/note/5ea98269c610ed2641427200">See existing note</Link>
            </Route>
            <Route path="/note/:noteId" exact>
              <Note />
            </Route>
            <Route path="/notes" exact>
              <Notes />
            </Route>
            <Route path="/note" exact>
              <Note />
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
