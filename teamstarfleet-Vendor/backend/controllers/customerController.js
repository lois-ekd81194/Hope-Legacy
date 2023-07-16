const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const passport = require("passport");
const { compareSync } = require("bcrypt-nodejs");
require("../config/passport")(passport);

// import models
const Foods = mongoose.model("Foods");
const Customers = mongoose.model("Customers");
const Vans = mongoose.model("Vans");
const Orders = mongoose.model("Orders");

// display home page
const customerHomePage = (req, res) => {
  res.send("<h1>Customer home page</h1>");
};

// display food menu
const displayMenu = async (req, res) => {
  try {
    const menu = await Foods.find();
    console.log(req.params.id);
    var id = mongoose.Types.ObjectId(req.params.id);
    const van = await Vans.findById(id);
    return res.json({
      menu: menu,
      van: van,
    });
  } catch (err) {
    res.status(400);
    return console.log(err);
  }
};

const getVans = async (req, res) => {
  try {
    const van = await Vans.find();
    return res.json(van);
  } catch (err) {
    res.status(400);
    return console.log(err);
  }
};

// display details of one food item
const displayOneFood = async (req, res) => {
  try {
    result = await Foods.findOne({ _id: req.params.id }, {});
    res.json(result);
  } catch (err) {
    res.status(400);
    return console.log("Database query failed");
  }
};

// create new order and save to database
const addOrder = async (req, res) => {
  const newOrder = new Orders({
    orderNum: req.body.orderNum,
    customer: req.body.customer,
    status: "preparing",
    items: req.body.items,
    quantities: req.body.quantities,
    van: req.body.van,
    lateOrder: false,
  });
  newOrder.save((err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
  await Customers.updateOne(
    { _id: req.body.customer },
    { currentOrder: newOrder._id }
  );
};

// sets an order's status to "cancelled"
const cancelOrder = async (req, res) => {
  try {
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      { status: req.body.status },
      { new: true }
    );
    return res.json(order);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// changes an order
const changeOrder = async (req, res) => {
  try {
    const order = await Orders.findOneAndUpdate(
      { _id: req.params.id },
      {
        status: "preparing",
        items: req.body.items,
        quantities: req.body.quantities,
      },
      { new: true }
    ).lean();
    return res.json(order);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

const listAllOrders = async (req, res) => {
  try {
    const thisUser = await Customers.findOne({ _id: req.params.id }, {});
    currentOrderId = thisUser.currentOrder;
    orderHistoryId = thisUser.orderHistory;
    orderHistoryId = orderHistoryId.map(mongoose.Types.ObjectId);
    const currentOrder = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "vans",
          localField: "van",
          foreignField: "_id",
          as: "van",
        },
      },
      {
        $match: { _id: mongoose.Types.ObjectId(currentOrderId) },
      },
    ]);
    const orderHistory = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "vans",
          localField: "van",
          foreignField: "_id",
          as: "van",
        },
      },
      {
        $match: { _id: { $in: orderHistoryId } },
      },
    ]);
    //.find({_id:orderHistoryId},{}).lean()

    orderHistory[orderHistory.length] = currentOrder[0];
    res.json(orderHistory);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

const viewOrderDetails = async (req, res) => {
  try {
    const thisOrder = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $lookup: {
          from: "vans",
          localField: "van",
          foreignField: "_id",
          as: "van",
        },
      },
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) },
      },
    ]);
    res.json(thisOrder);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};
const viewCustomerDetail = async (req, res) => {
  try {
    result = await Customers.findOne({ email: req.params.email }, {});
    res.json(result);
  } catch (err) {
    res.status(400);
    return console.log(err);
  }
};

const signUp = async (req, res, next) => {
  try {
    Customers.findOne({ email: req.body.email }, async (err, user) => {
      if (err) throw err;
      // if (user) res.send("User already exists");
      if (user) {
        const error = new Error("User already exists");
        return next(error);
      }
      if (!user) {
        var newCustomer = new Customers();
        newCustomer.email = req.body.email;
        newCustomer.password = newCustomer.generateHash(req.body.password);
        await newCustomer.save();
        res.send("user created");
      }
    });
  } catch (error) {
    return error;
  }
};

const customerLogin = async (req, res, next) => {
  passport.authenticate("customerLogin", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error(info.message);
        return next(error);
      }

      // otherwise, we use the req.login to store the user details
      // in the session. By setting session to false, we are essentially
      // asking the client to give us the token with each request
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store sensitive information such as the
        // user password in the token so we pick only the user's email
        const body = { _id: user.email };

        //Sign the JWT token and populate the payload with the user email
        const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

        //Send back the token to the client
        res.status(200); // OK status
        // send the token
        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: false,
          secure: true,
          domain: "https://info30005starfleet.herokuapp.com",
        });
        return res.json(token);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const changName = async (req, res) => {
  try {
    await Customers.findOneAndUpdate(
      { email: req.body.email },
      {
        $set: {
          familyName: req.body.familyName,
          givenName: req.body.givenName
        },
      }
    ).exec(function(err, customer){
      if(err){
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(customer);
      }
    });
  } catch (error) {
    return error;
  }
};
const changePW = async (req, res, next) => {
  passport.authenticate("customerLogin", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An Error occurred!!");
        return next(error);
      }
      user.password = user.generateHash(req.body.newPassword);
      await user.save();
      res.send("password updated");
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const customerLoggedIn = (req, res, next) => {
  console.log("here");
  if (req.isAuthenticated()) {
    console.log("is authenticated");
    return next();
  }
  // if not logged in, redirect to login form
  res.redirect("/");
};

module.exports = {
  customerHomePage,
  displayMenu,
  displayOneFood,
  addOrder,
  changePW,
  cancelOrder,
  changeOrder,

  listAllOrders,
  viewOrderDetails,
  customerLoggedIn,
  getVans,
  viewCustomerDetail,
  changName,

  signUp,
  customerLogin,
};
