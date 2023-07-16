require("dotenv").config();

const LocalStrategy = require("passport-local").Strategy;

const { Customers } = require("../models/db");
const { Vans } = require("../models/db");

const bcrypt = require("bcrypt-nodejs");
const passportJWT = require("passport-jwt");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (_id, done) {
    User.findById(_id, function (err, user) {
      done(err, user);
    });
  });

  // used to demonstrate JWT
  let opts = {};
  // extract token information
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  // key that was used to hash the token
  opts.secretOrKey = process.env.PASSPORT_KEY;

  // depending on what data you store in your token, setup a strategy
  // to verify that the token is valid....
  passport.use(
    "jwt",
    new JwtStrategy(opts, (jwt_payload, done) => {
      // here I'm simply searching for a user with the email addr
      // that was added to the token
      User.findOne({ email: jwt_payload.body._id }, (err, user) => {
        if (err) {
          return done(err, false);
        }

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );

  //Create a passport middleware to handle User login
  passport.use(
    "vendorLogin",
    new LocalStrategy(
      {
        usernameField: "name",
        passwordField: "password",
      },
      async (name, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          Vans.findOne({ name: name }, function (err, van) {
            if (err) return done(err);
            if (!van) return done(null, false, { message: "No van found." });
            // if (!van.validPassword(password))
            //   return done(null, false, { message: "Oops! Wrong password." });
            else {
              return done(null, van, { message: "Login successful" });
            }
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "customerLogin",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          //Find the user associated with the email provided by the user
          Customers.findOne({ email: email }, function (err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, { message: "No user found." });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: "Oops! Wrong password." });
            } else {
              console.log("SUCCESS");
              return done(null, user, { message: "Login successful" });
            }
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
