const express = require("express");

const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);

// add vendor router
const vendorRouter = express.Router();

// require vendor controller
const vendorController = require("../controllers/vendorController.js");

// vendor homepage
// vendorRouter.get("/", vendorController.vendorHomePage);

vendorRouter.post("/", vendorController.vendorLogin);

vendorRouter.post("/selling", vendorController.startSelling);

// view all outstanding(not fulfilled) orders by van id
vendorRouter.get(
  "/orders/outstanding/:vid",
  vendorController.getOutstandingOrders
);

// view all fulfilled orders(fulfilled but not picked up) by van id
vendorRouter.get("/orders/fulfilled/:vid", vendorController.getFulfilledOrders);

// view all history(picked up) orders by van id
vendorRouter.get("/orders/history/:vid", vendorController.getHistoryOrders);

// mark order as fulfilled by order id
vendorRouter.get("/order/markfulfilled/:oid", vendorController.markFulfilled);

// mark order as picked up by order id
vendorRouter.get("/order/markpickedup/:oid", vendorController.markPickedUp);

// stop selling by van id
vendorRouter.get("/stopselling/:vid", vendorController.stopSelling);

// start selling again by van id
vendorRouter.get("/startagain/:vid", vendorController.startAgain);

// Show order details of an order by order id
vendorRouter.get("/order/:oid", vendorController.viewOrderDetails);

// set van status as ready to sell
vendorRouter.get("/status/:vid", vendorController.setVanStatus);

// export the router
module.exports = vendorRouter;
