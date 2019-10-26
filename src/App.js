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
import Test from "./pages/table/test";
import City from "./pages/city";
import Order from "./pages/order";
import Common from "./common";
import OrderDetail from './pages/order/detail';
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from './pages/echarts/bar';
import Line from "./pages/echarts/line";
import Pie from './pages/echarts/pie';

function App() {
  return (
      <Router>
          <Switch>
              <Route path="/login" component={Login}/>

              <Route path="/common" render={() => (
                <Common>
                  <Route path="/order/detail/:orderId" component={OrderDetail}/>
                </Common>
              )}/>

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
                          <Route path={`/table/test`} component={Test}/>
                          <Route path={`/city`} component={City}/>
                          <Route path={`/order`} component={Order}/>
                          <Route path={`/user`} component={User}/>
                          <Route path={`/bikeMap`} component={BikeMap}/>
                          <Route path={`/charts/bar`} component={Bar}/>
                          <Route path={`/charts/pie`} component={Pie}/>
                          <Route path={`/charts/line`} component={Line}/>


                        <Route component={NoMatch}/>
                      </Switch>
                  </Admin>
              )}/>

          </Switch>
      </Router>
  )
}

export default App;



