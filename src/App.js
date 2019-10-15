import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.less';

import Admin from "./admin";
import Login from "./pages/login";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notification from "./pages/ui/notifications";
import NoMatch from "./pages/nomatch";
import Messages from "./pages/ui/messages";
import TabsComponent from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import Carousels from "./pages/ui/carousel";
import FormLogin from "./pages/form/login";
import FormRegister from "./pages/form/register";
import BasicTable from "./pages/table/basicTable";
import HighTable from "./pages/table/highTable";


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
                          <Route path={`/ui/notification`} component={Notification}/>
                          <Route path={`/ui/messages`} component={Messages}/>
                          <Route path={`/ui/tabs`} component={TabsComponent}/>
                          <Route path={`/ui/gallery`} component={Gallery}/>
                          <Route path={`/ui/carousel`} component={Carousels}/>
                          <Route path={`/form/login`} component={FormLogin}/>
                          <Route path={`/form/reg`} component={FormRegister}/>
                          <Route path={`/table/basic`} component={BasicTable}/>
                          <Route path={`/table/high`} component={HighTable}/>


                          <Route component={NoMatch}/>
                      </Switch>
                  </Admin>
              )}/>

          </Switch>
      </Router>
  )
}

export default App;
