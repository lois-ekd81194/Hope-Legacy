import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";

import { Account } from "./pages/account/index.jsx";
import React from "react";

import Home from "./pages/Home";
import Menu, { FoodDetails } from "./pages/Menu";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import our components

import Profile from "./pages/CustomerProfile";
import CustomerHome from "./pages/CustomerHompage";
import Orders, {
  OrderDetails,
  Payment,
  RateOrder,
} from "./pages/CustomerOrders";
import VendorLogin from "./vendor/VendorLogin";
import StartSelling from "./vendor/StartSelling.js";
import { ChangePW } from "./pages/ChangePW.js";
import ChangeName from "./pages/ChangeName";

import OutstandingOrders, {
  FulfilledOrders,
  HistoryOrders,
  VendorOrderDetails,
  MarkFulfilled,
  MarkPickedUp,
  StopSelling,
  StartAgain,
} from "./vendor/VendorOrders";

/**const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;*/

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/customer/orders/:id" component={Orders} />
          <Route exact path="/customer/order/:id" component={OrderDetails} />
          <Route exact path="/" component={Home} />
          <Route exact path="/customer" component={CustomerHome} />

          <Route exact path="/customer/profile" component={Profile} />

          <Route exact path="/customer/payment/:id" component={Payment} />
          <Route exact path="/customer/rating/:id" component={RateOrder} />
          <Route exact path="/customer/login" component={Account} />
          <Route exact path="/customer/changepw" component={ChangePW} />
          <Route exact path="/customer/changename" component={ChangeName} />
          <Route exact path="/customer/menu/van/:id" component={Menu}>
            <Navbar />
            <Menu />
          </Route>
          <Route
            exact
            path="/customer/menu/van/:id/order/:orderId"
            component={Menu}
          >
            <Navbar />
            <Menu />
          </Route>
          <Route exact path="/customer/menu/food/:id" component={FoodDetails}>
          </Route>
          <Route exact path="/vendor" component={VendorLogin} />
          <Route
            exact
            path="/vendor/orders/outstanding/:vid"
            component={OutstandingOrders}
          />
          <Route
            exact
            path="/vendor/orders/fulfilled/:vid"
            component={FulfilledOrders}
          />
          <Route
            exact
            path="/vendor/orders/history/:vid"
            component={HistoryOrders}
          />
          <Route
            exact
            path="/vendor/order/:oid"
            component={VendorOrderDetails}
          />
          <Route
            exact
            path="/vendor/order/markfulfilled/:oid"
            component={MarkFulfilled}
          />
          <Route
            exact
            path="/vendor/order/markpickedup/:oid"
            component={MarkPickedUp}
          />
          <Route exact path="/vendor/selling" component={StartSelling} />
          <Route
            exact
            path="/vendor/stopselling/:vid"
            component={StopSelling}
          />
          <Route exact path="/vendor/startagain/:vid" component={StartAgain} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
