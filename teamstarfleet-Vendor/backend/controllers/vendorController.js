const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);

// import models
const Foods = mongoose.model("Foods");
const Customers = mongoose.model("Customers");
const Vans = mongoose.model("Vans");
const Orders = mongoose.model("Orders");

// display home page
const vendorHomePage = (req, res) => {
  res.send("<h1>Vendor home page</h1>");
};

// set van status when ready to start selling
const setVanStatus = async (req, res) => {
  try {
    const van = await Vans.findById(req.params.id);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }

  Vans.updateOne(
    { _id: req.params.id },
    {
      $set: {
        currentlySelling: req.body.currentlySelling,
        locationDescription: req.body.locationDescription,
      },
    },

    (err, result) => {
      if (err) res.send(err);
      return res.send(result);
    }
  );
};

// return outstanding orders by van id
const getOutstandingOrders = async (req, res) => {
  try {
    const outstandingOrders = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $match: {
          van: mongoose.Types.ObjectId(req.params.vid),
          status: "preparing",
        },
      },
    ]);
    res.json(outstandingOrders);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// return fulfilled orders(fulfilled but not picked up) by van id
const getFulfilledOrders = async (req, res) => {
  try {
    const fulfilledOrders = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $match: {
          van: mongoose.Types.ObjectId(req.params.vid),
          status: "fulfilled",
        },
      },
    ]).sort({ date: -1 });
    res.send(fulfilledOrders);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// return history orders(picked up) by van id
const getHistoryOrders = async (req, res) => {
  try {
    const historyOrders = await Orders.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "items",
          foreignField: "_id",
          as: "items",
        },
      },
      {
        $match: {
          van: mongoose.Types.ObjectId(req.params.vid),
          status: "picked up",
        },
      },
    ]).sort({ date: -1 });
    res.send(historyOrders);
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
          from: "customers",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.oid) },
      },
    ]);
    res.json(thisOrder);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
};

// mark order as fulfilled
const markFulfilled = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.oid);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }

  Orders.updateOne(
    { _id: req.params.oid },
    { $set: { status: "fulfilled" } },
    (err, result) => {
      if (err) res.send(err);
      return res.send(result);
    }
  );
};

// mark order as picked up
const markPickedUp = async (req, res) => {
  try {
    const order = await Orders.findById(req.params.oid);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
  Orders.updateOne(
    { _id: req.params.oid },
    { $set: { status: "picked up" } },
    (err, result) => {
      if (err) res.send(err);
      return res.send(result);
    }
  );
};

const stopSelling = async (req, res) => {
  try {
    const van = await Vans.findById(req.params.vid);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
  Vans.updateOne(
    { _id: req.params.vid },
    { $set: { currentlySelling: false } },
    (err, result) => {
      if (err) res.send(err);
      return res.send(result);
    }
  );
};

const startAgain = async (req, res) => {
  try {
    const van = await Vans.findById(req.params.vid);
  } catch (err) {
    res.status(400);
    return res.send("Database query failed");
  }
  Vans.updateOne(
    { _id: req.params.vid },
    { $set: { currentlySelling: true } },
    (err, result) => {
      if (err) res.send(err);
      return res.send(result);
    }
  );
};

const vendorLogin = async (req, res, next) => {
  passport.authenticate("vendorLogin", async (err, van, info) => {
    try {
      if (err || !van) {
        const error = new Error("An Error occurred!*!");
        return next(error);
      }

      req.login(van, { session: false }, async (error) => {
        if (error) return next(error);

        // We don't want to store sensitive information such as the
        // user password in the token so we pick only the user's email
        const body = { _id: van.name };

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

const startSelling = async (req, res) => {
  try {
    await Vans.findOneAndUpdate(
      { name: req.body.vanName },
      {
        $set: {
          locationDescription: req.body.locationText,
          currentlySelling: true,
          location: req.body.location,
        },
      }
    ).exec(function (err, van) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(van._id);
      }
    });
  } catch (error) {
    return error;
  }
};

module.exports = {
  vendorHomePage,
  getOutstandingOrders,
  getFulfilledOrders,
  getHistoryOrders,
  viewOrderDetails,
  markFulfilled,
  markPickedUp,
  stopSelling,
  setVanStatus,
  vendorLogin,
  startSelling,
  startAgain,
};
