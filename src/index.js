import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Films from './Components/Films/Films';
import Characters from "./Components/Characters/Characters"


const App = () => (
  <Router>
    <Switch>
      <Route path="/characters/:filmId" component={Characters} />
      <Route path="/">
        <Films />
      </Route>
    </Switch>
  </Router>
);

render(<App />, document.getElementById("root"));
