const express = require("express");
const jwt = require("jsonwebtoken");

const passport = require("passport");
require("../config/passport")(passport);

// add vendor router
const customerRouter = express.Router();

// require customer controller
const customerController = require("../controllers/customerController.js");
const { Orders } = require("../models/db.js");
const { Customers } = require("../models/db.js");

// customer homepage
customerRouter.get("/", customerController.customerHomePage);

// customer homepage
customerRouter.get("/location", customerController.getVans);

// customer signup
customerRouter.post("/signup", customerController.signUp);

// customer login
customerRouter.post("/login", customerController.customerLogin);

// change customer password
customerRouter.post("/changepw", customerController.changePW);

// view menu of snacks (including pictures and prices)
customerRouter.get("/menu/van/:id", customerController.displayMenu);

// view details of a snack
customerRouter.get("/menu/food/:id", customerController.displayOneFood);

// customer starts a new order by requesting a snack
customerRouter.post("/addorder", customerController.addOrder);

// cancel an order by order id
customerRouter.patch("/order/:id", customerController.cancelOrder);

// changes an order by order id
customerRouter.patch(
  "/menu/van/:id/order/:orderId",
  customerController.changeOrder
);

// 4) List all orders of a customer by customer id
customerRouter.get("/orders/:id", customerController.listAllOrders);

// 4) Show order details of an order by order id
customerRouter.get("/order/:id", customerController.viewOrderDetails);

// 5) show customer detail
customerRouter.get("/:email", customerController.viewCustomerDetail);
// 6) change user name
customerRouter.post("/changename", customerController.changName);

// export the router
module.exports = customerRouter;
