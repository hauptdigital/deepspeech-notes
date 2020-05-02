import React from 'react';
import GlobalStyles from './GlobalStyles';
import { ThemeProvider } from 'emotion-theming';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import theme from './theme';
import Header from './components/Header';
import Menu from './components/Menu';
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
      <Router>
        <Header>
          <Menu />
          <MenuIcon />
        </Header>
        <Container>
          <Switch>
            <Route path="/" exact>
              <Notes />
            </Route>
            <Route path="/note/:noteId" exact>
              <Note />
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
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
