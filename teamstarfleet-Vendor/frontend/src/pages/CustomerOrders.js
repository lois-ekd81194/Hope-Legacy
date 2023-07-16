import React, { useState, useEffect } from "react";
import { useOrders, useOneOrder, cancelOrder } from "../api";
import moment from "moment";
import Header from "../components/CustomerHeader";

import Navbar from "../components/Navbar";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import { Typography } from "@material-ui/core";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
moment().format();
let theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
    h2: {
      fontWeight: "500",
      fontSize: 60,
    },
    h3: {
      fontWeight: "700",
      fontSize: 25,
    },
    body1: {
      fontWeight: "500",
      fontSize: 20,
    },
    body2: {
      fontWeight: "500",
      fontSize: 20,
      color: "red",
    },
    subtitle1: {
      fontWeight: "500",
      fontSize: 15,
    },
    subtitle2: {
      fontWeight: "500",
      fontSize: 25,
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.mainLight,
    width: "45px",
    height: "45px",
    alignItems: "center",
    justifyContent: "center",
  },
  items: {
    alignItems: "center",
  },
  details: {
    flexDirection: "column",
    paddingRight: "30px",
    paddingLeft: "30px",
    [theme.breakpoints.down("400")]: {
      minWidth: "400px",
    },
    [theme.breakpoints.up("400")]: {
      width: "600px",
    },
  },
  change: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  cancel: {
    backgroundColor: theme.palette.primary.red,
    "&:hover": {
      backgroundColor: theme.palette.primary.red,
    },
  },
  payment: {
    backgroundColor: theme.palette.primary.green,
    "&:hover": {
      backgroundColor: theme.palette.primary.green,
    },
  },
  pay: {
    minWidth: "300px",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const discountTime = 15;
const modifyTime = 10;
var modifyEligible = false;
var paymentEligible = false;


theme = responsiveFontSizes(theme);

export default function Orders({
  match: {
    params: { id },
  },
}) {
  const { loading, orders, error } = useOrders(id);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <Header link={"/customer"} type="History Order" />
      <section id="orderList">
        <h1>Orders</h1>
        <ul>
          {orders.map((order) => (
            <Order key={order._id} {...order} />
          ))}
        </ul>
      </section>
    </div>
  );
}

function Order(order) {
  const { _id, van, time, items, quantities } = order;
  var itemList = items.map((item) => Object.values(item)[1]);
  itemList = itemList.map((itemName) => <td>{itemName}</td>);

  var quantityList = quantities.map((quantity) => <td>{quantity}</td>);

  function renderTableRow() {
    var orderTable = [];
    for (var i = 0; i < quantityList.length; i++) {
      orderTable.push(
        <tr>
          {itemList[i]}&nbsp;&nbsp;&nbsp;&nbsp;{quantityList[i]}
        </tr>
      );
    }
    return orderTable;
  }

  const time_formatted = moment(time).format("dddd, MMMM Do YYYY, h:mm:ss a");

  return (
    <div>
      <h3>{van[0].name}</h3>
      <h4>{time_formatted}</h4>
      <table>{renderTableRow()}</table>
      <tr>
        <td>
          <a href={"/customer/order/" + _id}>Details</a>
        </td>
      </tr>
      <hr />
    </div>
  );
}

export function OrderDetails({
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const { loading, order, error } = useOneOrder(id);

  // Countdown functionality abstracted from joshtronic: https://www.digitalocean.com/community/tutorials/react-countdown-timer-react-hooks

  useEffect(() => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>no orders yet</p>;
    }  
    if (order){
      setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
    }
  });
  const calculateTimeLeft = () => {
    if (order.length !== 0){
      const difference = +moment(new Date(order[0].time)).add(Math.max(discountTime, modifyTime), 'm').toDate() - +new Date();
      let timeLeft = {};
      if (difference > 0) {
        timeLeft = {
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
        if (difference < modifyTime * 60000 || order[0].status === "fulfilled"){
          modifyEligible = true;
          if (order[0].status === "picked up"){
            paymentEligible = true;
          }
        }

      }
      else{
        modifyEligible = true;
        timeLeft = {
          minutes: 0,
          seconds: 0
        };
        if (order[0].status === "picked up"){
          paymentEligible = true;
        }
      }

    return timeLeft;
  }
  let timeLeft = {};
  timeLeft = {
    minutes: 0,
    seconds: 0
  };
  return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  const timerComponents = [];
  
  timerComponents.push(
      <span>
        {String("0" + timeLeft["minutes"]).slice(-2) + ":" + String("0" + timeLeft["seconds"]).slice(-2)}
      </span>
  );
  

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  var itemList = order[0].items.map((item) => Object.values(item)[1]);
  itemList = itemList.map((itemName) => <td>{itemName}</td>);

  var quantityList = order[0].quantities.map((quantity) => <td>{quantity}</td>);

  function renderTableRow() {
    var orderTable = [];
    for (var i = 0; i < quantityList.length; i++) {
      orderTable.push(
        <ThemeProvider theme={theme}>
          <Box display="flex" py={2}>
            <Box display="flex" className={classes.root}>
              <Typography variant="h3">{quantityList[i]}</Typography>
            </Box>
            <Box display="flex" px={3} flexGrow={1} className={classes.items}>
              <Typography variant="body1">{itemList[i]}</Typography>
            </Box>
            <Box display="flex" className={classes.items}>
              <Typography variant="body2">{"$" + ItemPrice(i)}</Typography>
            </Box>
          </Box>
        </ThemeProvider>
      );
    }
    return orderTable;
  }

  var price = 0;
  for (var i = 0; i < quantityList.length; i++) {
    price += order[0].quantities[i] * order[0].items[i].price;
  }
  price = (Math.round(price * 100) / 100).toFixed(2);

  var itemprice = 0;
  function ItemPrice(i) {
    itemprice = order[0].quantities[i] * order[0].items[i].price;
    itemprice = (Math.round(itemprice * 100) / 100).toFixed(2);
    return itemprice;
  }

  var discount = 0;
  discount = (Math.round(discount * 100) / 100).toFixed(2);
  if(order[0].lateOrder){
    discount = (Math.round(price * 0.2 * 100) / 100).toFixed(2);
    price = (Math.round((price - discount) * 100) / 100).toFixed(2)
  }

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center">
          <Box display="flex" className={classes.details}>
            <Box display="flex" flexDirection="column" pt={4} pb={2}>
              <Box display="flex">
                <Typography variant="h3">{order[0].van[0].name}</Typography>
              </Box>
              <Box display="flex">
                <Typography>{order[0].van[0].locationDescription}</Typography>
              </Box>
            </Box>
            {renderTableRow()}
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body1">{"Discount: $" + discount}</Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body1">{"Total: $" + price}</Typography>
            </Box>
            <Box display="flex" p={4} justifyContent="center">
              <Typography variant="h2"> 
              {timerComponents.length ? timerComponents : <span>Loading...</span>} 
              </Typography>
            </Box>
            <Box display="flex" p={4} justifyContent="center">
              <Typography variant="body1">
                {"Status: " + order[0].status}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box display="flex" px={3} py={2} justifyContent="center">
                <Button
                  variant="contained"
                  className={classes.change}
                  disabled={modifyEligible}
                  onClick={() => {
                    window.location.href =
                      "/customer/menu/van/" +
                      order[0].van[0]._id +
                      "/order/" +
                      order[0]._id;
                  }}
                >
                  <Typography variant="subtitle2">Change</Typography>
                </Button>
              </Box>
              <Box display="flex" px={3} py={2} justifyContent="center">
                <Button
                  variant="contained"
                  className={classes.cancel}
                  disabled={modifyEligible}
                  onClick={async () => {
                    await cancelOrder(order[0]._id);
                    window.location.href = "/customer";
                  }}
                >
                  <Typography variant="subtitle2">Cancel</Typography>
                </Button>
              </Box>
            </Box>
            <Box display="flex" py={7} justifyContent="center">
              <Button
                variant="contained"
                component={Link}
                disabled={paymentEligible}
                to={"/customer/payment/" + id}
                className={classes.payment}
              >
                <Typography variant="subtitle2">Go to payment</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export function Payment({
  match: {
    params: { id },
  },
}) {
  const classes = useStyles();
  const { loading, order, error } = useOneOrder(id);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  var itemList = order[0].items.map((item) => Object.values(item)[1]);
  itemList = itemList.map((itemName) => <td>{itemName}</td>);

  var quantityList = order[0].quantities.map((quantity) => <td>{quantity}</td>);

  function renderTableRow() {
    var orderTable = [];
    for (var i = 0; i < quantityList.length; i++) {
      orderTable.push(
        <ThemeProvider theme={theme}>
          <Box display="flex" py={2}>
            <Box display="flex" className={classes.root}>
              <Typography variant="h3">{quantityList[i]}</Typography>
            </Box>
            <Box display="flex" px={3} flexGrow={1} className={classes.items}>
              <Typography variant="body1">{itemList[i]}</Typography>
            </Box>
            <Box display="flex" className={classes.items}>
              <Typography variant="body2">{"$" + ItemPrice(i)}</Typography>
            </Box>
          </Box>
        </ThemeProvider>
      );
    }
    return orderTable;
  }

  var price = 0;
  for (var i = 0; i < quantityList.length; i++) {
    price += order[0].quantities[i] * order[0].items[i].price;
  }
  price = (Math.round(price * 100) / 100).toFixed(2);

  var itemprice = 0;
  function ItemPrice(i) {
    itemprice = order[0].quantities[i] * order[0].items[i].price;
    itemprice = (Math.round(itemprice * 100) / 100).toFixed(2);
    return itemprice;
  }


  var discount = 0;
  discount = (Math.round(discount * 100) / 100).toFixed(2);
  if(order[0].lateOrder){
    discount = (Math.round(price * 0.2 * 100) / 100).toFixed(2);
    price = (Math.round((price - discount) * 100) / 100).toFixed(2)
  }

  return (
    <div>
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center">
          <Box display="flex" className={classes.details}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              pt={7}
              pb={3}
            >
              <Box>
                <Typography variant="h2">{"$" + price}</Typography>
              </Box>
            </Box>
            {renderTableRow()}
            <Box display="flex" justifyContent="flex-end">
              <Typography variant="body1">{"Discount: $" + discount}</Typography>
            </Box>
            <Box display="flex" py={7} justifyContent="center">
              <Button variant="contained" 
                className={classes.pay}
                component={Link}
                disabled={paymentEligible}
                to={"/customer"}>
                <Typography variant="subtitle2">{"Pay $" + price}</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export function RateOrder({
  match: {
    params: { id },
  },
}) {
  const { loading, order, error } = useOneOrder(id);
  const [value, setValue] = React.useState(0);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div>
      <Header link="/customer" type="Order" />
      <Navbar />
      <ThemeProvider theme={theme}>
        <Box display="flex" justifyContent="center">
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}
