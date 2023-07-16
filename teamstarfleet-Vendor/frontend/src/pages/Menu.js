import React, { useState } from "react";
import { useMenu, useMenuItem, changeOrder } from "../api";
import { postOrder } from "../api";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Link, useHistory, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { makeStyles } from "@material-ui/core/styles";

let theme = createMuiTheme({
  typography: {
    fontFamily: "Poppins",
    h3: {
      fontWeight: "700",
      fontSize: 25,
    },
    h4: {
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
  menuitems: {
    paddingRight: "60px",
    [theme.breakpoints.down("350")]: {
      maxWidth: "320px",
    },
    [theme.breakpoints.up("350")]: {
      width: "400px",
    },
    [theme.breakpoints.up("505")]: {
      width: "400px",
      marginLeft: "25px",
      marginRight: "25px",
    },
  },
  food: {
    [theme.breakpoints.down("719")]: {
      justifyContent: "center",
    },
  },
  foodimg: {
    height: "100%",
    width: "100%",
    borderRadius: "15%",
  },
  body1: {
    fontWeight: "500",
    fontSize: 25,
  },
  body2: {
    fontWeight: "500",
    fontSize: 25,
    color: "red",
  },
}));

theme = responsiveFontSizes(theme);
export default function Menu() {
  const { id } = useParams();
  const { loading, menu, van, error } = useMenu(id);

  const history = useHistory();

  const [order, setOrder] = useState({
    orderNum: "999",
    customer: localStorage.getItem("customerID"),
    items: [],
    quantities: [],
    van: id,
    lateOrder: false,
  });

  function updateOrder(item, quantity) {
    const newOrder = { ...order };
    if (newOrder.items.includes(item)) {
      const itemIndex = newOrder.items.indexOf(item);
      newOrder.quantities[itemIndex] = quantity;
    } else {
      newOrder.items.push(item);
      newOrder.quantities.push(quantity);
    }
    setOrder(newOrder);
  }
  function isLogIn() {
    if (!localStorage.getItem("email")) {
      window.location.href = "/customer/login";
    } else {
      localStorage.setItem("selectedVan", id);
    }
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  return (
    <ThemeProvider theme={theme}>
      <section id="menu">
        <Box display="flex" flexDirection="column" p={4} pl={4}>
          <Box display="flex">
            <Typography variant="h3">{van.name}</Typography>
          </Box>
          <Box display="flex">
            <Typography>{van.locationDescription}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          flexDirection="row"
          px={1}
        >
          {menu.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              updateOrder={updateOrder}
            />
          ))}
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={async () => {
              if (window.location.href.indexOf("order") > -1) {
                const url = window.location.href;
                const orderId = url.substring(url.lastIndexOf("/") + 1);
                const res = await changeOrder(id, orderId, order);
                history.push("/customer/order/" + res._id);
              } else {
                const res = await postOrder(order);
                history.push("/customer/order/" + res._id);
              }
            }}
            style={{ backgroundColor: "#F1C40F", marginBottom: "40px" }}
          >
            <Typography variant="subtitle2" 
            onClick={isLogIn}>
              Confirm
            </Typography>
          </Button>
        </Box>
      </section>
    </ThemeProvider>
  );
}

function MenuItem(props) {
  const classes = useStyles();
  const { _id, name, price, picture } = props.menuItem;

  const [value, setValue] = useState(0);

  const decrement = () => {
    const newValue = Math.max(value - 1, 0);
    setValue(newValue);
    props.updateOrder(_id, newValue);
  };

  const increment = () => {
    const newValue = value + 1;
    setValue(newValue);
    props.updateOrder(_id, newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="row"
        className={classes.menuitems}
        pb={5}
      >
        <Box display="flex" p={0}>
          <img
            className={classes.foodimg}
            alt=""
            src={"https://source.unsplash.com/" + picture}
          ></img>
        </Box>
        <Box display="flex" flexGrow={1} pl={3}>
          <Box display="flex" flexDirection="column">
            <Box display="flex">
              <Typography variant="h4">{name}</Typography>
            </Box>
            <Box display="flex" flexGrow={1}>
              <Link to={"/customer/menu/food/" + _id}>
                <Typography variant="subtitle1">View Details</Typography>
              </Link>
            </Box>
            <Box display="flex">
              <Typography variant="body2">{"$" + (Math.round(price * 100) / 100).toFixed(2)}</Typography>
            </Box>
          </Box>
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Box
            display="flex"
            width="30px"
            height="30px"
            alignItems="center"
            justifyContent="center"
          >
            <IconButton onClick={decrement}>
              <RemoveCircleIcon style={{ color: "#F1C40F", fontSize: "35" }} />
            </IconButton>
            <Typography variant="h4">{value}</Typography>
            <IconButton onClick={increment}>
              <AddCircleIcon style={{ color: "#F1C40F", fontSize: "35" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export function FoodDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const { loading, menuItem, error } = useMenuItem(id);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }
  return (
    <div>
      <Navbar />
      <Box display="flex" justifyContent="center" p={8}>
        <Typography variant="h2">{menuItem.name}</Typography>
      </Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Box display="flex" px={4} py={2} justifyContent="center">
          <img
            className={classes.foodimg}
            alt=""
            src={"https://source.unsplash.com/" + menuItem.picture}
          ></img>
        </Box>
        <Box display="flex" px={4} py={2}>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexGrow={1}>
              <Typography className={classes.body1}>
                {menuItem.description}
              </Typography>
            </Box>
            <Box display="flex" className={classes.food}>
              <Typography className={classes.body2}>
                {"$" + (Math.round(menuItem.price * 100) / 100).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
