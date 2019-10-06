import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.less';

import Admin from "./admin";
import Login from "./pages/login";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";

import NoMatch from "./pages/nomatch";


function App() {
  return (
      <Router>
          <Switch>
              <Route path="/login" component={Login}/>

              <Route path="/" render={() => (
                  <Admin>
                      <Switch>
                          <Route path={`/home`} component={Home}/>
                          <Route path={`/ui/buttons`} component={Buttons}/>
                          <Route path={`/ui/modals`} component={Modals}/>
                          <Route path={`/ui/loadings`} component={Loadings}/>

                          <Route component={NoMatch}/>
                      </Switch>
                  </Admin>
              )}/>

          </Switch>
      </Router>
  )
}

export default App;
