const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

// define food schema
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  picture: { type: String },
  description: { type: String },
});

// define customer schema
const customerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  familyName: { type: String, default: undefined },
  givenName: { type: String, default: undefined },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
});

// method for generating a hash; used for password hashing
customerSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checks if password is valid
customerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// define order schema
const orderSchema = new mongoose.Schema({
  orderNum: { type: String, required: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customers",
    required: true,
  },
  status: { type: String, default: "preparing" },
  time: { type: Date, required: true, default: Date.now },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Foods", required: true },
  ],
  quantities: {
    type: [Number],
    validate: (v) => Array.isArray(v) && v.length > 0,
  },
  van: { type: mongoose.Schema.Types.ObjectId, ref: "Vans", required: true },
  lateOrder: { type: Boolean, default: false },
});

// define van schema
const vanSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  currentlySelling: { type: Boolean, required: true },
  location: {
    lat: { type: String, default: "not access to the google map yet" },
    lng: { type: String },
  },
  locationDescription: { type: String },
  currentOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  currentEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" },
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
});

const Foods = mongoose.model("Foods", foodSchema);
const Customers = mongoose.model("Customers", customerSchema);
const Orders = mongoose.model("Orders", orderSchema);
const Vans = mongoose.model("Vans", vanSchema);
const Employees = mongoose.model("Employees", employeeSchema);

module.exports = { Foods, Customers, Orders, Vans, Employees };
