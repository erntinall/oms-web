import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './LoginPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/homepage">
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
