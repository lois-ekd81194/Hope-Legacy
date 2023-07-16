const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash-plus");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    credentials: true, // add Access-Control-Allow-Credentials to header
    origin: "https://info30005starfleet-frontend.herokuapp.com",
    //origin: "http://localhost:3000",
 })
);

app.use(
  session({
    secret: process.env.PASSPORT_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(process.env.PASSPORT_KEY));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// access collections in database
require("./models");

// set up routes
const customerRouter = require("./routes/customerRouter");
const vendorRouter = require("./routes/vendorRouter");

// home page
app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to our app. Please specify 'customer' or 'vendor' in route</h1>"
  );
});

// handle customer requests
app.use("/customer", customerRouter);

// handle vendor requests
app.use("/vendor", vendorRouter);

app.listen(process.env.PORT || 8001, () => {
  console.log("The app server is running");
});
