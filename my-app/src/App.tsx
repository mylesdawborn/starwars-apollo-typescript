import React, { } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './index.css'

import { Home, Character } from './components'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/character">
          <Character />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
